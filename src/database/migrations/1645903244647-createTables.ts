import {MigrationInterface, QueryRunner} from "typeorm";

export class createTables1645903244647 implements MigrationInterface {
    name = 'createTables1645903244647'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying(10) NOT NULL, "state" character varying NOT NULL, "city" character varying NOT NULL, "neighborhood" character varying NOT NULL, "street" character varying NOT NULL, "number" character varying NOT NULL, "complement" character varying NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "description" character varying(180) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "contacts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone1" character varying(14) NOT NULL, "phone2" character varying(14) NOT NULL, "instagram" character varying NOT NULL, "facebook" character varying NOT NULL, "whatsapp" character varying NOT NULL, CONSTRAINT "PK_b99cd40cfd66a99f1571f4f72e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "images" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "avatar" character varying NOT NULL, "image1" character varying NOT NULL, "image2" character varying NOT NULL, "image3" character varying NOT NULL, "image4" character varying NOT NULL, "image5" character varying NOT NULL, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying(15) NOT NULL, "birthDate" date NOT NULL, "avatarUrl" character varying NOT NULL, "password" character varying NOT NULL, "isAdm" boolean NOT NULL DEFAULT false, "hasCommerce" boolean NOT NULL DEFAULT false, "createdAt" date NOT NULL DEFAULT '"2022-02-26T19:20:47.326Z"', "updatedAt" date NOT NULL DEFAULT '"2022-02-26T19:20:47.326Z"', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_a000cca60bcf04454e727699490" UNIQUE ("phone"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commerces" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(60) NOT NULL, "cnpj" character varying(18) NOT NULL, "description" character varying(180) NOT NULL, "createdAt" date NOT NULL DEFAULT '"2022-02-26T19:20:47.326Z"', "updatedAt" date NOT NULL DEFAULT '"2022-02-26T19:20:47.327Z"', "active" boolean NOT NULL DEFAULT true, "addressId" uuid, "contactId" uuid, "imageId" uuid, "ownerId" uuid, CONSTRAINT "UQ_1d590feb89d9f338d901b0031e5" UNIQUE ("cnpj"), CONSTRAINT "REL_90c64f783332f2308b659d8fa6" UNIQUE ("addressId"), CONSTRAINT "REL_f0bb2f0a2ff7ee5a7efe2f1074" UNIQUE ("contactId"), CONSTRAINT "REL_d99c0f2c8637f7bd85ec448c83" UNIQUE ("imageId"), CONSTRAINT "PK_f589550ef99c2016fbfface36d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commerces_category_categories" ("commercesId" uuid NOT NULL, "categoriesId" uuid NOT NULL, CONSTRAINT "PK_1e7d6205d417c0382d08bd45881" PRIMARY KEY ("commercesId", "categoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a9daf3f558722bc14ea9c3530c" ON "commerces_category_categories" ("commercesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ee1812dc317219fe0a2d6e2a09" ON "commerces_category_categories" ("categoriesId") `);
        await queryRunner.query(`ALTER TABLE "commerces" ADD CONSTRAINT "FK_90c64f783332f2308b659d8fa6a" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commerces" ADD CONSTRAINT "FK_f0bb2f0a2ff7ee5a7efe2f1074d" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commerces" ADD CONSTRAINT "FK_d99c0f2c8637f7bd85ec448c83c" FOREIGN KEY ("imageId") REFERENCES "images"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commerces" ADD CONSTRAINT "FK_755c600c838e18514bfc4172683" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "commerces_category_categories" ADD CONSTRAINT "FK_a9daf3f558722bc14ea9c3530cc" FOREIGN KEY ("commercesId") REFERENCES "commerces"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "commerces_category_categories" ADD CONSTRAINT "FK_ee1812dc317219fe0a2d6e2a098" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "commerces_category_categories" DROP CONSTRAINT "FK_ee1812dc317219fe0a2d6e2a098"`);
        await queryRunner.query(`ALTER TABLE "commerces_category_categories" DROP CONSTRAINT "FK_a9daf3f558722bc14ea9c3530cc"`);
        await queryRunner.query(`ALTER TABLE "commerces" DROP CONSTRAINT "FK_755c600c838e18514bfc4172683"`);
        await queryRunner.query(`ALTER TABLE "commerces" DROP CONSTRAINT "FK_d99c0f2c8637f7bd85ec448c83c"`);
        await queryRunner.query(`ALTER TABLE "commerces" DROP CONSTRAINT "FK_f0bb2f0a2ff7ee5a7efe2f1074d"`);
        await queryRunner.query(`ALTER TABLE "commerces" DROP CONSTRAINT "FK_90c64f783332f2308b659d8fa6a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ee1812dc317219fe0a2d6e2a09"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9daf3f558722bc14ea9c3530c"`);
        await queryRunner.query(`DROP TABLE "commerces_category_categories"`);
        await queryRunner.query(`DROP TABLE "commerces"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "images"`);
        await queryRunner.query(`DROP TABLE "contacts"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
