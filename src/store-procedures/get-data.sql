CREATE OR REPLACE FUNCTION public.get_data()
	RETURNS TABLE(j jsonb) 
	LANGUAGE 'plpgsql'
	COST 100
	VOLATILE PARALLEL UNSAFE
	ROWS 1000

AS $BODY$
	DECLARE
BEGIN
	RETURN QUERY SELECT jsonb_agg(t) FROM (
		select * from public.quote
	) t;
END;
$BODY$;