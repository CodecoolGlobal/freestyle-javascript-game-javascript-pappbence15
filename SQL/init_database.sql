ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_user_id CASCADE;

DROP TABLE IF EXISTS public.users;
CREATE TABLE users (
    id serial NOT NULL,
    user_name text,
    password text,
    balance text,
    biggest_win text
    /*card_number text,
      cvv integer
     */
);

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_user_id PRIMARY KEY (id);

INSERT INTO users (user_name, password, balance, biggest_win)
VALUES ('Béla', 'asd', 5000, 0),
       ('Laci_a_hegyről', 'asd', 40000, 0),
       ('CA_URAM', 'asd', 101202, 0)