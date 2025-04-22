create table usuarios
(
	id serial not null,
	nome varchar(255) not null,
	email varchar(255)
);

create table categoria
(
	id serial not null,
	nome varchar(255) not null,
	tipo varchar(255) not null
);

create table transacao
(
	id serial not null,
	user_id integer not null,
	categoria_id integer not null,
	valor numeric(5,2) not null,
	descricao varchar(255),
	date date not null
);

create table metas
(
	id serial not null,
	user_id integer not null,
	nome varchar(255) not null,
	valor_alvo numeric(10, 2) not null,
	data_limite date not null
);

alter table usuarios add constraint "PK USUARIO" primary key (id);
alter table categoria add constraint "PK CATEGORIA" primary key (id);
alter table transacao add constraint "PK TRANSACAO" primary key (id);
alter table metas add constraint "PK METAS" primary key (id);

alter table transacao add constraint "FK USUARIO => TRANSACAO" foreign key (user_id) references usuarios(id);
alter table transacao add constraint "DK CATEGORIA => TRANSACAO" foreign key (categoria_id) references categoria(id);
alter table metas add constraint "FK USUARIO => METAS" foreign key (user_id) references usuarios(id);