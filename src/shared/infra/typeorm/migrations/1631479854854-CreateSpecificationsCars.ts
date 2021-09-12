import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateSpecificationsCars1631479854854
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKCarId',
        columnNames: ['car_id'],
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'specifications_cars',
      new TableForeignKey({
        name: 'FKSpecificationId',
        columnNames: ['specification_id'],
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        onUpdate: 'SET NULL',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKSpecificationId',
    );
    await queryRunner.dropForeignKey('specifications_cars', 'FKCarId');

    await queryRunner.dropTable('specifications_cars');
  }
}
