CREATE TABLE user (
  id int unsigned primary key auto_increment not null,
  email varchar(255) not null unique,
  password varchar(255) not null,
  firstname varchar(255) not null,
  lastname varchar(255) not null,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP not null,
  updated_at TIMESTAMP
);

CREATE TABLE admin (
  id int unsigned primary key auto_increment not null,
  user_id int unsigned not null,
  foreign key(user_id) references user(id)
  ON DELETE CASCADE
);

CREATE TABLE gender (
  id int unsigned primary key auto_increment not null,
  type  varchar(255) not null
);

CREATE TABLE client (
  id int unsigned primary key auto_increment not null,
  user_id int unsigned not null,
  birthdate date not null,
  nickname varchar(255) not null,
  gender_id int unsigned not null,
  foreign key(user_id) references user(id)
  ON DELETE CASCADE,
  foreign key(gender_id) references gender(id)
);


CREATE TABLE phone (
  id int unsigned auto_increment primary key not null,
  phone_number varchar(10),
  client_id int unsigned not null,
  foreign key(client_id) references client(id)
  ON DELETE CASCADE
);

CREATE TABLE reservation (
  id int unsigned primary key auto_increment not null,
  is_reserved BOOLEAN not null default 0
);

CREATE TABLE client_reservation (
  id int unsigned primary key auto_increment not null,
  client_id int unsigned not null,
  reservation_id int unsigned not null,
  foreign key(client_id) references client(id),
  foreign key(reservation_id) references reservation(id)
  ON DELETE CASCADE
);

CREATE TABLE reservation_date (
  id int unsigned primary key auto_increment not null,
  is_confirmed BOOLEAN not null default 0,
  reservation_id int unsigned not null,
  foreign key(reservation_id) references reservation(id)
  ON DELETE CASCADE
);

CREATE TABLE chr (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null,
  address varchar(255) not null,
  description text not null,
  average_budget int unsigned not null
);

CREATE TABLE client_chr (
  id int unsigned primary key auto_increment not null,
  client_id int unsigned not null,
  chr_id int unsigned not null,
  foreign key(client_id) references client(id),
  foreign key(chr_id) references chr(id)
);

CREATE TABLE chr_reservation (
  id int unsigned primary key auto_increment not null,
  reservation_id int unsigned not null,
  chr_id int unsigned not null,
  foreign key(reservation_id) references reservation(id)
  ON DELETE CASCADE,
  foreign key(chr_id) references chr(id)
);

CREATE TABLE restaurant (
  id int unsigned primary key auto_increment not null,
  chr_id int unsigned not null,
  type varchar(255) not null,
  foreign key(chr_id) references chr(id)
  ON DELETE CASCADE
);

CREATE TABLE hotel (
  id int unsigned primary key auto_increment not null,
  chr_id int unsigned not null,
  type varchar(255) not null,
  foreign key(chr_id) references chr(id)
  ON DELETE CASCADE
);

CREATE TABLE activity (
  id int unsigned primary key auto_increment not null,
  chr_id int unsigned not null,
  duration int not null,
  foreign key(chr_id) references chr(id)
  ON DELETE CASCADE
);

CREATE TABLE keyword (
  id int unsigned primary key auto_increment not null,
  name varchar(255) not null
);

CREATE TABLE chr_keyword (
    id int unsigned primary key auto_increment not null,
  chr_id int unsigned not null,
  keyword_id int unsigned not null,
  foreign key(chr_id) references chr(id),
  foreign key(keyword_id) references keyword(id)
  ON DELETE CASCADE
);

CREATE TABLE client_keyword (
  id int unsigned primary key auto_increment not null,
  client_id int unsigned not null,
  keyword_id int unsigned not null,
  foreign key(client_id) references client(id)
  ON DELETE CASCADE,
  foreign key(keyword_id) references keyword(id)
  ON DELETE CASCADE
);

CREATE TABLE illustration (
  id int unsigned primary key auto_increment not null,
  link varchar(255) not null
);

CREATE TABLE illustration_keyword (
  id int unsigned primary key auto_increment not null,
  illustration_id int unsigned not null,
  keyword_id int unsigned not null,
  foreign key(illustration_id) references illustration(id),
  foreign key(keyword_id) references keyword(id)
);

CREATE TABLE illustration_chr (
  id int unsigned primary key auto_increment not null,
  illustration_id int unsigned not null,
  chr_id int unsigned not null,
  foreign key(illustration_id) references illustration(id),
  foreign key(chr_id) references chr(id)
);

-- INSERT INTO keyword (name)
-- VALUES
-- ('Terroir'),
-- ('Intimiste'),
-- ('Authentique'),
-- ('Immersion totale'),
-- ('Concept unique'),
-- ('Insolite'),
-- ('Festif'),
-- ('Elegant'),
-- ('Moderne'),
-- ('Convivial'),
-- ('Décontracté'),
-- ('Naturel'),
-- ('Sensationnel'),
-- ('Raffiné'),
-- ('Contemplatif'),
-- ('Exotique'),
-- ('Familial'),
-- ('Traditionnel'),
-- ('Accueillant'),
-- ('Prestigieux'),
-- ('Exclusif'),
-- ('Chaleureux'),
-- ('Dynamique'),
-- ('Centre-ville'),
-- ('Vignobles'),
-- ('Design visionnaire'),
-- ('Contemporain'),
-- ('Romantique'),
-- ('Champêtre'),
-- ('Loft moderne'),
-- ('Original'),
-- ('Artistique'),
-- ('Bord de l''eau'),
-- ('Atypique'),
-- ('Luxueux'),
-- ('Ludique'),
-- ('Aventure'),
-- ('Compétitif'),
-- ('Artistique'),
-- ('Sensoriel'),
-- ('Expérientiel'),
-- ('Créatif'),
-- ('Technologique'),
-- ('Relaxant'),
-- ('Intéractif'),
-- ('Culturel'),
-- ('Gastronomique'),
-- ('Educatif');

-- INSERT INTO chr_keyword (chr_id, keyword_id)
-- VALUES
-- (1, 12),
-- (1, 44),
-- (1, 35),
-- (2, 36),
-- (2, 37),
-- (2, 38),
-- (3, 1),
-- (3, 10),
-- (3, 47),
-- (4, 1),
-- (4, 12),
-- (4, 47),
-- (5, 46),
-- (5, 10),
-- (5, 47),
-- (6, 36),
-- (6, 4),
-- (6, 43),
-- (7, 36),
-- (7, 40),
-- (7, 45),
-- (8, 44),
-- (8, 6),
-- (8, 10),
-- (9, 39),
-- (9, 4),
-- (9, 42),
-- (10, 37),
-- (10, 36),
-- (10, 38),
-- (11, 48),
-- (11, 4),
-- (11, 43),
-- (12, 36),
-- (12, 4),
-- (12, 38),
-- (13, 39),
-- (13, 28),
-- (13, 42),
-- (14, 39),
-- (14, 12),
-- (14, 42),
-- (15, 39),
-- (15, 40),
-- (15, 41),
-- (16, 36),
-- (16, 37),
-- (16, 38),
-- (17, 1),
-- (17, 3),
-- (17, 46),
-- (18, 1),
-- (18, 2),
-- (18, 3),
-- (19, 4),
-- (19, 5),
-- (19, 6),
-- (20, 7),
-- (20, 5),
-- (20, 4),
-- (21, 8),
-- (21, 9),
-- (21, 10),
-- (22, 8),
-- (22, 11),
-- (22, 12),
-- (23, 13),
-- (23, 14),
-- (23, 15),
-- (24, 9),
-- (24, 2),
-- (24, 8),
-- (25, 16),
-- (25, 17),
-- (25, 10),
-- (26, 3),
-- (26, 17),
-- (26, 10),
-- (27, 18),
-- (27, 11),
-- (27, 19),
-- (28, 16),
-- (28, 7),
-- (28, 11),
-- (29, 1),
-- (29, 5),
-- (29, 18),
-- (30, 1),
-- (30, 11),
-- (30, 3),
-- (31, 14),
-- (31, 20),
-- (31, 8),
-- (32, 1),
-- (32, 12),
-- (32, 3),
-- (33, 8),
-- (33, 20),
-- (33, 21),
-- (34, 17),
-- (34, 10),
-- (34, 22),
-- (36, 7),
-- (36, 11),
-- (36, 23),
-- (37, 8),
-- (37, 2),
-- (37, 22),
-- (38, 24),
-- (38, 8),
-- (38, 2),
-- (39, 25),
-- (39, 3),
-- (39, 22),
-- (40, 24),
-- (40, 26),
-- (40, 14),
-- (41, 24),
-- (41, 9),
-- (41, 2),
-- (42, 24),
-- (42, 27),
-- (42, 2),
-- (43, 24),
-- (43, 8),
-- (43, 28),
-- (44, 29),
-- (44, 30),
-- (44, 14),
-- (45, 24),
-- (45, 31),
-- (45, 32),
-- (46, 25),
-- (46, 3),
-- (46, 22),
-- (47, 25),
-- (47, 3),
-- (47, 10),
-- (48, 33),
-- (48, 14),
-- (48, 22),
-- (49, 33),
-- (49, 34),
-- (50, 25),
-- (50, 29),
-- (50, 35);

-- INSERT INTO illustration (link)
-- VALUES
-- ('assets/images/activity-images/SPALesSourcesDeCaudalie1_desktop.webp'),
-- ('assets/images/activity-images/SPALesSourcesDeCaudalie1_mobile.webp'),
-- ('assets/images/activity-images/SPALesSourcesDeCaudalie2_desktop.jpg'),
-- ('assets/images/activity-images/SPALesSourcesDeCaudalie2_mobile.jpg'),
-- ('assets/images/activity-images/SPALesSourcesDeCaudalie3_desktop.jpg'),
-- ('assets/images/activity-images/SPALesSourcesDeCaudalie3_mobile.jpg');

-- INSERT INTO illustration_chr (chr_id, illustration_id)
-- VALUES
-- (1, 1),
-- (1, 2),
-- (1, 3),
-- (1, 4),
-- (1, 5),
-- (1, 6);