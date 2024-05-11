//will not use any more //
const { Pool } = require('pg');

const db = new Pool({
  connectionString: 'postgres://postgres.gawnnxzgrxkdmhmzhssw:K20_GameFi_DATN_HCMUS@aws-0-us-west-1.pooler.supabase.com:5432/postgres',
});

module.exports = db;
