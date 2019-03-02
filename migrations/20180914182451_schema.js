/* eslint-disable */

exports.up = function (knex, Promise) {
  return createPars()
    .then(createFiles)
    .then(makeUnique);

    function createPars() {
      return knex.schema.createTableIfNotExists('pars', (table) => {
        table.integer('file_id');
        table.integer('par_num');
        table.string('text');
        table.foreign('file_id').references('id').inTable('files');
      })
    }

  function createFiles() {
    return knex.schema.createTableIfNotExists('files', (table) => {
      table.increments('id').primary();
      table.string('title');
      // table.unique('id');
    })
  }

  function makeUnique() {
    return knex.schema.alterTable('pars', function(t) {
      t.unique(['file_id', 'par_num'])
  })
}


};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('pars')
    .then(() => {
      return knex.schema.dropTable('files')
    })
};
