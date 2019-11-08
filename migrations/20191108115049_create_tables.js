
exports.up = function(knex) {
  return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable();
      tbl.string('description', 255);
      tbl.integer('completed').defaultTo(0);
    })
    .createTable('tasks', tbl => {
      tbl.increments();
      tbl.string('description', 255).notNullable();
      tbl.string('notes', 255);
      tbl.integer('completed').defaultTo(0);
      tbl 
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
    .createTable('resources', tbl => {
      tbl.increments();
      tbl.string('name', 64).notNullable().unique();
      tbl.string('description', 255);
    })
    .createTable('project_resources', tbl => {
      tbl.increments();
      tbl
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
      tbl
        .integer('resource_id')
        .unsigned()
        .references('id')
        .inTable('resources')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
    })
};

exports.down = function(knex) {
  knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};
