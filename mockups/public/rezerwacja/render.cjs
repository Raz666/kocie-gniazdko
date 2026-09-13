// Export maintained HTML; never overwrite it with generated markup.
require('../render-public.cjs').render('booking').catch(error => { console.error(error); process.exitCode = 1; });
