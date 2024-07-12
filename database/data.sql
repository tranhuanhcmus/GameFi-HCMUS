/*==============================================================*/
/* 20127056 VÕ DUY NHÂN                                         */
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127162	NGUYỄN SƠN HÒA                                      */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

-- Insert data into ACCOUNT table
CREATE TABLE "ElementPools" (
	id int4 NOT NULL,
	description text NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "ElementPools_pkey" PRIMARY KEY (id)
);

-- "EyePools" definition

-- Drop table
-- DROP TABLE "EyePools";

CREATE TABLE "EyePools" (
	id int4 NOT NULL,
	description text NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "EyePools_pkey" PRIMARY KEY (id)
);

-- "FurPools" definition

-- Drop table
-- DROP TABLE "FurPools";

CREATE TABLE "FurPools" (
	id int4 NOT NULL,
	description text NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "FurPools_pkey" PRIMARY KEY (id)
);

-- "Hangmans" definition

-- Drop table
-- DROP TABLE "Hangmans";

CREATE TABLE "Hangmans" (
	id uuid NOT NULL,
	question text NOT NULL,
	answer text NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "Hangmans_pkey" PRIMARY KEY (id)
);

-- "ItemAppOwners" definition

-- Drop table
-- DROP TABLE "ItemAppOwners";

CREATE TABLE "ItemAppOwners" (
	id uuid NOT NULL,
	"owner" text NOT NULL,
	quantity int4 NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "ItemAppOwners_pkey" PRIMARY KEY (id, "owner")
);

-- "ItemApps" definition

-- Drop table
-- DROP TABLE "ItemApps";

CREATE TABLE "ItemApps" (
	id uuid NOT NULL,
	"name" text NOT NULL,
	description text NULL,
	category text NULL,
	quality text NULL,
	quantity int4 NOT NULL,
	gemcost int4 NULL DEFAULT 0,
	goldcost int4 NULL DEFAULT 0,
	image text NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "ItemApps_pkey" PRIMARY KEY (id)
);

-- "BoostEffects" definition

-- Drop table
-- DROP TABLE "BoostEffects";

CREATE TABLE "BoostEffects" (
	id uuid NOT NULL,
	"tokenId" int4 NOT NULL,
	"owner" text NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"lastTimeBoost" timestamptz NULL,
	CONSTRAINT "BoostEffects_pkey" PRIMARY KEY (id, "tokenId", "owner")
);

-- "Cups" definition

-- Drop table
-- DROP TABLE "Cups";

CREATE TABLE "Cups" (
	id uuid NOT NULL,
	"owner" text NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"cup" int4 NOT NULL,
	CONSTRAINT "Cups_pkey" PRIMARY KEY (id, "owner")
);

-- "ItemGameOwners" definition

-- Drop table
-- DROP TABLE "ItemGameOwners";

CREATE TABLE "ItemGameOwners" (
	id uuid NOT NULL,
	"owner" text NOT NULL,
	quantity int4 NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "ItemGameOwners_pkey" PRIMARY KEY (id, "owner")
);

-- "ItemGames" definition

-- Drop table
-- DROP TABLE "ItemGames";

CREATE TABLE "ItemGames" (
	id uuid NOT NULL,
	"name" text NOT NULL,
	description text NULL,
	category text NULL,
	quality text NULL,
	quantity int4 NOT NULL,
	gemcost int4 NULL DEFAULT 0,
	goldcost int4 NULL DEFAULT 0,
	image text NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "ItemGames_pkey" PRIMARY KEY (id)
);

-- "ItemPools" definition

-- Drop table
-- DROP TABLE "ItemPools";

CREATE TABLE "ItemPools" (
	id int4 NOT NULL,
	description text NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "ItemPools_pkey" PRIMARY KEY (id)
);

-- "NFTs" definition

-- Drop table
-- DROP TABLE "NFTs";

CREATE TABLE "NFTs" (
	"tokenId" int4 NOT NULL,
	"tokenUri" text NULL,
	"owner" text NULL,
	"exp" int4 NULL DEFAULT 0,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"lastTimePlayed" timestamptz NULL,
	energy int4 NULL DEFAULT 3,
	CONSTRAINT "NFTs_pkey" PRIMARY KEY ("tokenId")
);

-- "TokenUris" definition

-- Drop table
-- DROP TABLE "TokenUris";

CREATE TABLE "TokenUris" (
	id serial NOT NULL,
	"tokenUri" text NULL,
	"data" jsonb NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "TokenUris_pkey" PRIMARY KEY (id)
);

-- NFTs and TokenUris relationship
ALTER TABLE "NFTs"
ADD CONSTRAINT fk_nfts_tokenuri
FOREIGN KEY ("tokenUri")
REFERENCES "TokenUris"("tokenUri");

-- ItemAppOwners and ItemApps relationship
ALTER TABLE "ItemAppOwners"
ADD CONSTRAINT fk_itemappowners_itemapps
FOREIGN KEY ("id")
REFERENCES "ItemApps"("id");

-- BoostEffects and NFTs relationship
ALTER TABLE "BoostEffects"
ADD CONSTRAINT fk_boosteffects_nfts
FOREIGN KEY ("tokenId")
REFERENCES "NFTs"("tokenId");

-- BoostEffects and ItemGames relationship
ALTER TABLE "BoostEffects"
ADD CONSTRAINT fk_boosteffects_itemgames
FOREIGN KEY ("id")
REFERENCES "ItemGames"("id");

-- ItemGameOwners and ItemGames relationship
ALTER TABLE "ItemGameOwners"
ADD CONSTRAINT fk_itemgameowners_itemgames
FOREIGN KEY ("id")
REFERENCES "ItemGames"("id");