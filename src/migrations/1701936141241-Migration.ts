import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1701936141241 implements MigrationInterface {
    name = 'Migration1701936141241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" SERIAL NOT NULL, "firstname" character varying NOT NULL, "surname" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "maker_info" ("id_maker" SERIAL NOT NULL, "name_maker" character varying NOT NULL, CONSTRAINT "PK_060e64639703b660787e96b3bb1" PRIMARY KEY ("id_maker"))`);
        await queryRunner.query(`CREATE TABLE "products_types" ("id_type" SERIAL NOT NULL, "name_type" character varying NOT NULL, CONSTRAINT "PK_7e6c61e1177de2720ae093ff859" PRIMARY KEY ("id_type"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id_product" SERIAL NOT NULL, "name_product" character varying NOT NULL, "id_maker" integer NOT NULL, "id_type" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_61a11191b5789c8a8035edf88f7" PRIMARY KEY ("id_product"))`);
        await queryRunner.query(`CREATE TABLE "basket" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" integer NOT NULL, "id_product" integer NOT NULL, "count_product" integer NOT NULL, CONSTRAINT "PK_83742707ff244654cb84827be84" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "orders_details" ("order_id" SERIAL NOT NULL, "user_id" integer NOT NULL, "id_product" integer NOT NULL, "count_product" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_a8cfe4ac098e31c4681f1a7a7e" UNIQUE ("id_product"), CONSTRAINT "PK_f5cefb92297d781e62607b608fd" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("order_id" integer NOT NULL, "user_id" integer NOT NULL, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`CREATE TABLE "roles" ("user_id" integer NOT NULL, "role" character varying NOT NULL, CONSTRAINT "PK_a969861629af37cd1c7f4ff3e6b" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_c4b89783918178f6ec3fcc4b436" FOREIGN KEY ("id_maker") REFERENCES "maker_info"("id_maker") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_33543453e29d8c7fa2f5a087046" FOREIGN KEY ("id_type") REFERENCES "products_types"("id_type") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basket" ADD CONSTRAINT "FK_7563f002619986adbd5231cd45e" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basket" ADD CONSTRAINT "FK_48b523db3c0c2e9931ad8c80d4f" FOREIGN KEY ("id_product") REFERENCES "products"("id_product") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_details" ADD CONSTRAINT "FK_e965972eb41c194ebb41baf368b" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders_details" ADD CONSTRAINT "FK_a8cfe4ac098e31c4681f1a7a7ef" FOREIGN KEY ("id_product") REFERENCES "products"("id_product") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cad55b3cb25b38be94d2ce831db" FOREIGN KEY ("order_id") REFERENCES "orders_details"("order_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "roles" ADD CONSTRAINT "FK_a969861629af37cd1c7f4ff3e6b" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles" DROP CONSTRAINT "FK_a969861629af37cd1c7f4ff3e6b"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cad55b3cb25b38be94d2ce831db"`);
        await queryRunner.query(`ALTER TABLE "orders_details" DROP CONSTRAINT "FK_a8cfe4ac098e31c4681f1a7a7ef"`);
        await queryRunner.query(`ALTER TABLE "orders_details" DROP CONSTRAINT "FK_e965972eb41c194ebb41baf368b"`);
        await queryRunner.query(`ALTER TABLE "basket" DROP CONSTRAINT "FK_48b523db3c0c2e9931ad8c80d4f"`);
        await queryRunner.query(`ALTER TABLE "basket" DROP CONSTRAINT "FK_7563f002619986adbd5231cd45e"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_33543453e29d8c7fa2f5a087046"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_c4b89783918178f6ec3fcc4b436"`);
        await queryRunner.query(`DROP TABLE "roles"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orders_details"`);
        await queryRunner.query(`DROP TABLE "basket"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "products_types"`);
        await queryRunner.query(`DROP TABLE "maker_info"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
