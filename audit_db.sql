--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5

-- Started on 2024-02-13 16:03:07 EAT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16410)
-- Name: currencyconversions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE audit_trail.currencyconversions (
                                            fromcurrency character varying(3),
                                            tocurrency character varying(3),
                                            conversionrate numeric(10,6)
);


ALTER TABLE audit_trail.currencyconversions OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16400)
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE audit_trail.transactions (
                                     transactionid integer NOT NULL,
                                     transactiontype character varying(10),
                                     userid integer,
                                     fulltimestamp timestamp without time zone,
                                     status character varying(10),
                                     senderamount numeric(10,2),
                                     receiveramount numeric(10,2),
                                     sendercurrency character varying(3),
                                     receivercurrency character varying(3),
                                     senderid integer,
                                     receiverid integer
);


ALTER TABLE audit_trail.transactions OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 16395)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE audit_trail.users (
                              userid integer NOT NULL,
                              balance numeric(10,2),
                              currency character varying(3)
);


ALTER TABLE audit_trail.users OWNER TO postgres;

--
-- TOC entry 3449 (class 2606 OID 16404)
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY audit_trail.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transactionid);


--
-- TOC entry 3447 (class 2606 OID 16399)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY audit_trail.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 3450 (class 2606 OID 16405)
-- Name: transactions transactions_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY audit_trail.transactions
    ADD CONSTRAINT transactions_userid_fkey FOREIGN KEY (userid) REFERENCES audit_trail.users(userid);


-- Completed on 2024-02-13 16:03:07 EAT

--
-- PostgreSQL database dump complete
--
