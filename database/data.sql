/*==============================================================*/
/* 20127056 VÕ DUY NHÂN                                         */
/* 20127063 PHAN MINH PHÚC                                      */
/* 20127162	NGUYỄN SƠN HÒA                                      */
/* 20127237 NGUYỄN TẤN LỰC                                      */
/* 20127507	BÙI TRẦN HUÂN                                       */
/*==============================================================*/

-- Insert data into ACCOUNT table
INSERT INTO public."ItemApps" (id,name,description,category,quality,quantity,gemcost,goldcost,image,"createdAt","updatedAt") VALUES
 ('7dc748d5-de7d-4a76-9a58-62463ee7be14','Gem','Gem','Currency','Normal',1,1,1000,'/uploads/gem.jpg','2024-05-07 22:22:05.251+07','2024-05-07 22:22:05.251+07'),
 ('1a06543f-42c7-402f-a22a-32594b58c0e5','Gold','Gold','Currency','Normal',1,0,1,'/uploads/gold.jpg','2024-05-07 22:22:35.891+07','2024-05-07 22:22:35.891+07');

INSERT INTO public."ItemGames" (id,name,description,category,quality,quantity,gemcost,goldcost,image,"createdAt","updatedAt") VALUES
	 ('baebb924-5be9-4a6a-81d5-80fcc5c5ba48','Energy Poition','Energy restoration','Poition','Normal',10,1,1000,'/uploads/itemGame-item_game_energyPoition.svg','2024-05-09 22:27:48.417+07','2024-05-09 22:27:48.417+07'),
	 ('b86e38fe-c9e2-4437-8f7e-08455b3e4c8e','HP Poition','HP restoration','Poition','Normal',10,1,1000,'/uploads/itemGame-item_game_hpPoition.png','2024-05-09 22:28:54.329+07','2024-05-09 22:28:54.329+07'),
	 ('a8affeaf-f7ba-4374-b42a-32422c521b0c','Mana Poition','Mana restoration','Poition','Normal',10,1,1000,'/uploads/itemGame-item_game_manaPoition.png','2024-05-09 22:30:04.225+07','2024-05-09 22:30:04.225+07');