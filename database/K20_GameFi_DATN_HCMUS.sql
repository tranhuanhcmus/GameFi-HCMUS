/*==============================================================*/
/* 20127056 VÕ DUY NHÂN                                         */
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127162	NGUYỄN SƠN HÒA                                      */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

-- "ElementPools" definition

-- Drop table
-- DROP TABLE "ElementPools";

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
	"owner" text NOT NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"lastTimeBoost" timestamptz NULL,
	CONSTRAINT "BoostEffects_pkey" PRIMARY KEY (id, "owner")
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
	"tokenUri" text NOT NULL,
	"owner" text NULL,
	"exp" int4 NULL DEFAULT 0,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	"lastTimePlayed" timestamptz NULL,
	energy int4 NULL DEFAULT 3,
	CONSTRAINT "NFTs_pkey" PRIMARY KEY ("tokenId"),
	CONSTRAINT "NFTs_tokenUri_unique" UNIQUE ("tokenUri");
);

-- "TokenUris" definition

-- Drop table
-- DROP TABLE "TokenUris";

CREATE TABLE "TokenUris" (
	id serial NOT NULL,
	"tokenUri" text NOT NULL,
	"data" jsonb NULL,
	"createdAt" timestamptz NOT NULL,
	"updatedAt" timestamptz NOT NULL,
	CONSTRAINT "TokenUris_pkey" PRIMARY KEY (id),
	CONSTRAINT "TokenUris_tokenUri_unique" UNIQUE ("tokenUri")
);

-- TokenUris and NFTs relationship
ALTER TABLE "TokenUris"
ADD CONSTRAINT fk_tokenuris_nfts
FOREIGN KEY ("tokenUri")
REFERENCES "NFTs"("tokenUri");

-- ItemAppOwners and ItemApps relationship
ALTER TABLE "ItemAppOwners"
ADD CONSTRAINT fk_itemappowners_itemapps
FOREIGN KEY ("id")
REFERENCES "ItemApps"("id");

-- BoostEffects and ItemApps relationship
ALTER TABLE "BoostEffects"
ADD CONSTRAINT fk_boosteffects_itemapps
FOREIGN KEY ("id")
REFERENCES "ItemApps"("id");

-- ItemGameOwners and ItemGames relationship
ALTER TABLE "ItemGameOwners"
ADD CONSTRAINT fk_itemgameowners_itemgames
FOREIGN KEY ("id")
REFERENCES "ItemGames"("id");

INSERT INTO "ElementPools" (id, description, "createdAt", "updatedAt") VALUES
	(1, 'fire', '2024-05-23 23:29:54.205+07', '2024-05-23 23:29:54.205+07'),
	(2, 'water', '2024-05-23 23:29:54.205+07', '2024-05-23 23:29:54.205+07'),
	(3, 'earth', '2024-05-23 23:29:54.205+07', '2024-05-23 23:29:54.205+07'),
	(4, 'air', '2024-05-23 23:29:54.205+07', '2024-05-23 23:29:54.205+07'),
	(5, 'light', '2024-05-23 23:29:54.205+07', '2024-05-23 23:29:54.205+07'),
	(6, 'darkness', '2024-05-23 23:29:54.205+07', '2024-05-23 23:29:54.205+07'),
	(7, 'metal', '2024-05-23 23:29:54.205+07', '2024-05-23 23:29:54.205+07');

INSERT INTO "EyePools" (id, description, "createdAt", "updatedAt") VALUES
	(1, 'happy', '2024-05-23 23:29:54.215+07', '2024-05-23 23:29:54.215+07'),
	(2, 'sleepy', '2024-05-23 23:29:54.215+07', '2024-05-23 23:29:54.215+07'),
	(3, 'angry', '2024-05-23 23:29:54.215+07', '2024-05-23 23:29:54.215+07'),
	(4, 'innocent', '2024-05-23 23:29:54.215+07', '2024-05-23 23:29:54.215+07');

INSERT INTO "FurPools" (id, description, "createdAt", "updatedAt") VALUES
	(1, 'fluffy', '2024-05-23 23:29:54.223+07', '2024-05-23 23:29:54.223+07'),
	(2, 'furry', '2024-05-23 23:29:54.223+07', '2024-05-23 23:29:54.223+07'),
	(3, 'silky', '2024-05-23 23:29:54.223+07', '2024-05-23 23:29:54.223+07');

INSERT INTO "ItemAppOwners" (id, "owner", quantity, "createdAt", "updatedAt") VALUES
	('50948ce8-ec90-4636-921e-a7cc3d2461ef', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 10000, '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07'),
	('cbe36358-689e-4a74-b509-6ed7964cd096', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 1000000, '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07');

INSERT INTO "ItemApps" (id, "name", description, category, quality, quantity, gemcost, goldcost, image, "createdAt", "updatedAt") VALUES
	('28914bc0-f2be-471a-864f-b25b5ce9e6d6', 'Apple', 'Food for your pet', 'food', 'normal', 1, 10, 100, '/uploads/apple.png', '2024-06-20 00:02:13.906+07', '2024-06-20 00:02:13.906+07'),
	('5ec90482-6111-4ed8-bc4b-6400b1f10f66', 'Banana', 'Food for your pet', 'food', 'normal', 1, 10, 100, '/uploads/banana.png', '2024-06-20 00:02:58.464+07', '2024-06-20 00:02:58.464+07'),
	('50948ce8-ec90-4636-921e-a7cc3d2461ef', 'Grape', 'Food for your pet', 'food', 'normal', 1, 10, 100, '/uploads/grape.png', '2024-06-20 00:03:27.285+07', '2024-06-20 00:03:27.285+07'),
	('cbe36358-689e-4a74-b509-6ed7964cd096', 'Watermelon', 'Food for your pet', 'food', 'normal', 1, 15, 150, '/uploads/watermelon.png', '2024-06-20 00:03:55.925+07', '2024-06-20 00:03:55.925+07'),
	('233c9960-2ada-496b-8632-f4cdbd1bb04d', 'Combo Candy', 'Super rare food for your pet, good for their health', 'food', 'super rare', 1, 30, 300, '/uploads/combo_candy.png', '2024-06-20 00:05:16.491+07', '2024-06-20 00:05:16.491+07'),
	('af305b84-9d9e-476e-a09d-31329b637194', 'Cookie', 'Rare food for your pet, recover fast', 'food', 'rare', 1, 20, 200, '/uploads/cookie.png', '2024-06-20 00:06:01.652+07', '2024-06-20 00:06:01.652+07'),
	('4aa7bae0-de15-4ed9-ac4f-8df444670189', 'Donut', 'Rare food for your pet, recover fast', 'food', 'rare', 1, 20, 200, '/uploads/donut.png', '2024-06-20 00:06:18.908+07', '2024-06-20 00:06:18.908+07');
	('7dc748d5-de7d-4a76-9a58-62463ee7be14', 'Gem', 'Gem', 'currency', 'normal', 1, 1, 0, '/uploads/gem.jpg', '2024-05-07 22:22:05.251+07', '2024-05-07 22:22:05.251+07'),
    ('1a06543f-42c7-402f-a22a-32594b58c0e5', 'Gold', 'Gold', 'currency', 'normal', 1000, 1, 0, '/uploads/gold.jpg', '2024-05-07 22:22:35.891+07', '2024-05-07 22:22:35.891+07'),
    
INSERT INTO "BoostEffects" (id, "tokenId", "owner", "lastTimeBoost", "createdAt", "updatedAt") VALUES
	('281fc328-8e1d-418a-a75c-13e423e28c16', 1111, '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07'),
	('c6b19675-b258-447d-b5e0-69b3f6da2aad', 1117, '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07'),
	('5579da2e-d4b9-4f2d-8475-3ed525c598da', 1118, '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07');

INSERT INTO "Cups" (id, "owner", "cup", "createdAt", "updatedAt") VALUES
	('d1f2e245-3a6d-4e2a-a041-45fa0fb7c41e', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 10, '2024-04-27 15:52:28.105+07', '2024-04-27 15:52:28.105+07');

INSERT INTO "ItemGameOwners" (id, "owner", quantity, "createdAt", "updatedAt") VALUES
	('06f61bcc-9ac2-4865-8a25-fdcf1113648a', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 100, '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07'),
	('5579da2e-d4b9-4f2d-8475-3ed525c598da', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 100, '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07'),
	('97f378e4-4ba3-4a66-86b9-a2938b2a48ac', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 100, '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07');
	('3f04dd95-0a0d-4e66-87a3-02d0edd58839', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 100, '2024-04-20 15:52:28.105+07', '2024-04-20 15:52:28.105+07');

INSERT INTO "ItemGames" (id, "name", description, category, quality, quantity, gemcost, goldcost, image, "createdAt", "updatedAt") VALUES
	('ad12ea88-44c8-4417-9e87-3954f3cc91be', 'Bronze Treasure', 'Bronze Treasure', 'treasure', 'normal', 1, 500, 5000, '/uploads/bronze_treasure.png', '2024-06-20 00:23:52.809+07', '2024-06-20 00:23:52.809+07'),
	('63533349-9217-4291-8877-47bbcde060e7', 'Silver Treasure', 'Silver Treasure', 'treasure', 'rare', 1, 1000, 10000, '/uploads/silver_treasure.png', '2024-06-20 00:25:36.182+07', '2024-06-20 00:25:36.182+07'),
	('ddaaf364-3cd2-4a7f-8471-38f13c11da20', 'Diamond Treasure', 'Diamond Treasure', 'treasure', 'super rare', 1, 3000, 30000, '/uploads/diamond_treasure.png', '2024-06-20 00:28:59.364+07', '2024-06-20 00:28:59.364+07'),
	('23be6e9d-c003-4821-bdce-20042adcb033', 'Energy Battery v1', 'Energy Battery v1', 'energy', 'normal', 1, 300, 3000, '/uploads/energy_battery_v1.png', '2024-06-20 00:35:39.831+07', '2024-06-20 00:35:39.831+07'),
	('be7a5bdd-d778-41d2-8597-6240af23fbaf', 'Energy Battery v3', 'Energy Battery v3', 'energy', 'super rare', 1, 1000, 10000, '/uploads/energy_battery_v3.png', '2024-06-20 00:41:45.951+07', '2024-06-20 00:41:45.951+07'),
	('3f04dd95-0a0d-4e66-87a3-02d0edd58839', 'Energy Battery v2', 'Energy Battery v2', 'energy', 'rare', 1, 500, 5000, '/uploads/energy_battery_v2.png', '2024-06-20 00:43:41.815+07', '2024-06-20 00:43:41.815+07'),
	('281fc328-8e1d-418a-a75c-13e423e28c16', 'Health Boost v1', 'Health Boost v1', 'boost', 'normal', 1, 200, 2000, '/uploads/health_boost_v1.png', '2024-06-20 00:49:48.638+07', '2024-06-20 00:49:48.638+07'),
	('6fbe149e-42cd-48b0-b535-437c116dc8e1', 'Health Boost v2', 'Health Boost v2', 'boost', 'normal', 1, 500, 5000, '/uploads/health_boost_v2.png', '2024-06-20 00:50:50.89+07', '2024-06-20 00:50:50.89+07'),
	('06f61bcc-9ac2-4865-8a25-fdcf1113648a', 'Time Freeze Hour Glass', 'Time Freeze Hour Glass', 'boost', 'rare', 1, 500, 5000, '/uploads/hour_glass.png', '2024-06-20 00:58:30.148+07', '2024-06-20 00:58:30.148+07'),
	('ee952c37-635a-443c-97ac-3ee54b846b3c', 'Food v1', 'Food v1', 'food', 'rare', 1, 100, 1000, '/uploads/food_v1.png', '2024-06-20 22:36:23.226+07', '2024-06-20 22:36:23.226+07'),
	('c1c32067-3cdb-4bdc-88d3-fb7b89e0a994', 'Food v2', 'Food v2', 'food', 'normal', 1, 150, 1500, '/uploads/food_v2.png', '2024-06-20 22:41:22.221+07', '2024-06-20 22:41:22.221+07'),
	('8fc57057-dcd4-4425-bad5-61af64faaaa1', 'Food v3', 'Food v3', 'food', 'normal', 1, 200, 2000, '/uploads/food_v3.png', '2024-06-20 22:42:38.078+07', '2024-06-20 22:42:38.078+07'),
	('97f378e4-4ba3-4a66-86b9-a2938b2a48ac', 'Food v4', 'Food v4', 'food', 'super rare', 1, 300, 3000, '/uploads/food_v4.png', '2024-06-20 22:48:26.91+07', '2024-06-20 22:48:26.91+07'),
	('c6b19675-b258-447d-b5e0-69b3f6da2aad', 'Boost v1', 'Boost v1', 'boost', 'super rare', 1, 500, 5000, '/uploads/boost_v1.png', '2024-06-20 22:53:55.507+07', '2024-06-20 22:53:55.507+07'),
	('559db0c3-bf4a-44a7-b54f-cec54c8dc123', 'background v1', 'background v1', 'background', 'normal', 1, 300, 3000, '/uploads/bg_v1.png', '2024-06-20 23:00:44.468+07', '2024-06-20 23:00:44.468+07'),
	('729cf06b-1b0a-4efb-90f5-cb7358d49295', 'background v2', 'background v2', 'background', 'normal', 1, 300, 3000, '/uploads/bg_v2.png', '2024-06-20 23:00:55.33+07', '2024-06-20 23:00:55.33+07'),
	('5579da2e-d4b9-4f2d-8475-3ed525c598da', 'boost v2', 'boost v2', 'boost', 'rare', 1, 300, 3000, '/uploads/boost_v2.png', '2024-06-20 23:03:49.222+07', '2024-06-20 23:03:49.222+07'),
	('1fca6ce6-e2b6-4c53-abda-f20e1c38b8fa', 'background v3', 'background v3', 'background', 'rare', 1, 300, 3000, '/uploads/bg_v3.png', '2024-06-20 23:04:39.956+07', '2024-06-20 23:04:39.956+07'),
	('9839e144-d44e-4037-ac3b-ab4a59a645be', 'background v4', 'background v4', 'background', 'rare', 1, 300, 3000, '/uploads/bg_v4.png', '2024-06-20 23:07:07.198+07', '2024-06-20 23:07:07.198+07'),
	('989a2fc1-828b-401b-9df0-21af4ca472f9', 'background v5', 'background v5', 'background', 'rare', 1, 300, 3000, '/uploads/bg_v5.png', '2024-06-20 23:07:21.448+07', '2024-06-20 23:07:21.448+07');

INSERT INTO "ItemPools" (id, description, "createdAt", "updatedAt") VALUES
	(1, 'sword', '2024-05-23 23:29:54.234+07', '2024-05-23 23:29:54.234+07'),
	(2, 'shield', '2024-05-23 23:29:54.234+07', '2024-05-23 23:29:54.234+07'),
	(3, 'spear', '2024-05-23 23:29:54.234+07', '2024-05-23 23:29:54.234+07'),
	(4, 'bow', '2024-05-23 23:29:54.234+07', '2024-05-23 23:29:54.234+07');

INSERT INTO "NFTs" ("tokenId", "tokenUri", "owner", "exp", "createdAt", "updatedAt", "lastTimePlayed", energy) VALUES
	(104, 'https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/104.json', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 0, '2024-05-23 23:29:54.156+07', '2024-05-23 23:29:54.156+07', '2024-05-24 00:18:37.637+07', 3),
	(105, 'https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/104.json', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 0, '2024-05-23 23:29:54.156+07', '2024-05-23 23:29:54.156+07', '2024-05-24 00:18:37.637+07', 3),
	(106, 'https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/104.json', '0x70706f6Aab6Eea877AaCb7A86fd813F3667ca937', 0, '2024-05-23 23:29:54.156+07', '2024-05-23 23:29:54.156+07', '2024-05-24 00:18:37.637+07', 3),
	(100, 'ipfs://QmViw28bv8Ttb45gP2zYv7r1WaUno87vVX3Use44wLboVy/100.json', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 0, '2024-05-24 22:03:05.394+07', '2024-05-24 22:03:05.394+07', '2024-05-24 22:03:05.392+07', 3),
	(998, 'https://ipfs.io/ipfs/QmP1Qnd9xTY8c1RsNPsSxeJCnrNkS9Wggs1mYRvcpdHx8E/998.json', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 0, '2024-05-24 22:45:46.802+07', '2024-05-24 22:45:46.802+07', '2024-05-24 22:45:46.8+07', 3),
	(997, 'https://ipfs.io/ipfs/QmP1Qnd9xTY8c1RsNPsSxeJCnrNkS9Wggs1mYRvcpdHx8E/998.json', '0x0E9A319aCE579BC0142d7b8186AfD84647bcDb3D', 0, '2024-05-24 22:46:33.198+07', '2024-05-24 23:22:10.146+07', '2024-05-24 23:22:10.145+07', 3),
	(999, 'ipfs://bafybeigyumne76m5gke7asealdbokdbujjj5b7klskvwiasyeiy6nvuc2a/999.json', '0xFe25C8BB510D24ab8B3237294D1A8fCC93241454', 0, '2024-05-24 23:25:23.288+07', '2024-05-24 23:25:23.288+07', '2024-05-24 23:25:23.287+07', 3);

INSERT INTO "TokenUris" (id, "tokenUri", "data", "createdAt", "updatedAt") VALUES
	(1, 'https://bb069f0cd1c8ebfa80c6e64868cf1241.ipfscdn.io/ipfs/bafybeiea7xm3gla4bukzglbgbcjjm64qsjlf732segs4d2fbbdry24m2by/104.json', '{"name": "Harry", "type": "NFT", "image": "https://images.nightcafe.studio/jobs/ZmXUlD3BXhjV4i4wnWka/ZmXUlD3BXhjV4i4wnWka--1--zv5e8.jpg?tr=w-1600,c-at_max", "title": "Test", "tokenId": "104", "attributes": {"type": "Dragon"}, "description": "This is a normal Dragon"}', '2024-05-23 23:29:54.193+07', '2024-05-23 23:29:54.193+07'),
	(3, 'https://ipfs.io/ipfs/QmP1Qnd9xTY8c1RsNPsSxeJCnrNkS9Wggs1mYRvcpdHx8E/998.json', '{"name": "First Bear 240524", "type": "NFT", "image": "https://ipfs.io/ipfs/QmcphtmQUFeZEMbxgiXgSJFqNwHizrLNrmWEoZzGKjNxcR/bear-998.jpg", "title": "Bear 998", "sprites": "https://ipfs.io/ipfs/QmcphtmQUFeZEMbxgiXgSJFqNwHizrLNrmWEoZzGKjNxcR/sprite-998.png", "tokenId": "998", "attributes": {"eye": 1, "fur": 1, "item": 1, "element": 1}, "properties": {}, "description": "First Bear 240524"}', '2024-05-24 22:45:46.995+07', '2024-05-24 22:45:46.995+07');

INSERT INTO "Hangmans" (id,question,answer,"createdAt","updatedAt") VALUES
	 ('e8724e05-1056-4798-9a0b-1cd3a91f8c70','What is the largest planet in our solar system?','JUPITER','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('ac032e2e-4db0-42d0-8c3e-50b52d15636b','What animal is known as the ''King of the Jungle''?','LION','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('8d3a0a0e-ee16-4849-b3e7-45612b825951','What do you call a shape with eight sides?','OCTAGON','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('9d8ff0e7-7e42-41de-aa9e-c4f1f45855cb','What is the capital of Italy?','ROME','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('f012784b-2a42-47f4-ba03-b26854688213','What is the smallest unit of life?','CELL','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('d95adccb-16cc-45c2-a417-11e6328c730e','What fruit is used to make wine?','GRAPE','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('f3f1661c-0e3b-43a3-8c14-1d8b5966f4b5','What is the hardest natural substance on Earth?','DIAMOND','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('58f58d5d-36c8-4fb4-8b44-5b59330fc98d','What is the largest mammal?','WHALE','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('f0bfb4f1-f1f1-4692-a283-0a5e6e1a93df','What is the common name for sodium chloride?','SALT','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('b32d9058-4e8d-4b7e-b6ad-8f3bca326c6e','What is the world''s longest river?','NILE','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('d8d9d0e8-29f5-4ff2-b32a-f04e61d10c58','What organ pumps blood through the body?','HEART','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('19de3335-d956-4c11-82b2-fc3e2a1f8a51','What is the term for a baby cat?','KITTEN','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('6cc725e8-b138-4654-8c54-05cf366a9321','What is the capital city of Japan?','TOKYO','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('02f14e65-0b3f-4c5e-a5b2-61f8b52d5225','What is the main gas found in the air we breathe?','NITROGEN','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('0ac9ee48-b23a-4abf-b4d2-1f1592f136fc','What is the smallest continent by land area?','AUSTRALIA','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('e2680792-812f-4e2d-b57d-7c8d71c92eb4','What do cows produce that humans commonly drink?','MILK','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('ee2f8ed3-919e-42e5-bf9f-f085c2fd75cc','What is the primary ingredient in bread?','FLOUR','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('60c90c02-4596-409b-95f0-184a58807a89','What is the term for frozen water?','ICE','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('6d4c1688-ff04-42c3-8b7c-bac125e07a4f','What is the main language spoken in Spain?','SPANISH','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('e8d0599b-f13a-4f89-bf38-06af646a8552','Hoang Sa, Truong Sa belong to?','VIETNAM','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('c1cfb0a9-fad9-48e5-b8f4-7077bc4d6c9f','What is the fastest land animal?','CHEETAH','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('1a9b25c8-aa0b-4fd7-8c0a-795c6d0e4b80','What is the currency of the United Kingdom?','POUND','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('7290e3b0-4188-4882-8db0-2a7ec5f61b32','What is the chemical symbol for oxygen?','O2','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('a1a5f107-eae5-4e77-8a3b-370597961e27','What is the currency of the United State?','USD','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07'),
	 ('ff11d6c0-0d36-49a7-88c2-33e4e61b6da4','What is the chemical symbol for water?','H2O','2024-05-23 18:02:29.02+07','2024-05-23 18:02:29.02+07');
