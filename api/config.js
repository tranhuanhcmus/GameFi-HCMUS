const { Pool } = require('pg');

const db = new Pool({
  connectionString: 'postgresql://postgres:K20_GameFi_DATN_HCMUS@db.gawnnxzgrxkdmhmzhssw.supabase.co:5432/postgres',
});

module.exports = db;
