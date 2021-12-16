import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1639639453895 implements MigrationInterface {
    name = 'Initialize1639639453895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`ranking\` (\`id\` varchar(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`ranking_item\` (\`id\` varchar(36) NOT NULL, \`rankingId\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer_item\` (\`id\` varchar(36) NOT NULL, \`answerId\` varchar(255) NOT NULL, \`ranking_itemId\` varchar(255) NOT NULL, \`rank\` int NOT NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`answer\` (\`id\` varchar(36) NOT NULL, \`rankingId\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`ranking_item\` ADD CONSTRAINT \`FK_b610ee61158677873eb3fe97e28\` FOREIGN KEY (\`rankingId\`) REFERENCES \`ranking\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer_item\` ADD CONSTRAINT \`FK_30052ff62211bdb7671a8c52154\` FOREIGN KEY (\`answerId\`) REFERENCES \`answer\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer_item\` ADD CONSTRAINT \`FK_f1b2bbafcd1a34c695a39ac5879\` FOREIGN KEY (\`ranking_itemId\`) REFERENCES \`ranking_item\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`answer\` ADD CONSTRAINT \`FK_b1a117a0f5cef2f021b97a77b20\` FOREIGN KEY (\`rankingId\`) REFERENCES \`ranking\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer\` DROP FOREIGN KEY \`FK_b1a117a0f5cef2f021b97a77b20\``);
        await queryRunner.query(`ALTER TABLE \`answer_item\` DROP FOREIGN KEY \`FK_f1b2bbafcd1a34c695a39ac5879\``);
        await queryRunner.query(`ALTER TABLE \`answer_item\` DROP FOREIGN KEY \`FK_30052ff62211bdb7671a8c52154\``);
        await queryRunner.query(`ALTER TABLE \`ranking_item\` DROP FOREIGN KEY \`FK_b610ee61158677873eb3fe97e28\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`answer\``);
        await queryRunner.query(`DROP TABLE \`answer_item\``);
        await queryRunner.query(`DROP TABLE \`ranking_item\``);
        await queryRunner.query(`DROP TABLE \`ranking\``);
    }

}
