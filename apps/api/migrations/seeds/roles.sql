INSERT INTO roles (role) VALUES ('user'), ('admin') ON CONFLICT DO NOTHING;
