-- Ejecuta este SQL en el SQL Editor de tu proyecto Supabase

CREATE TABLE respuestas (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  encuesta_id text NOT NULL,
  encuesta_titulo text NOT NULL,
  respuestas  jsonb NOT NULL,
  enviado_en  timestamptz DEFAULT now()
);

-- Permitir inserciones anónimas (para que el formulario público pueda enviar)
ALTER TABLE respuestas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir insert público"
  ON respuestas FOR INSERT
  TO anon
  WITH CHECK (true);

-- Solo tú (autenticado) puedes leer las respuestas
CREATE POLICY "Solo admins pueden leer"
  ON respuestas FOR SELECT
  TO authenticated
  USING (true);
