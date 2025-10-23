-- Books API Database Schema
-- Create database: CREATE DATABASE books_db;

-- Create books table
CREATE TABLE IF NOT EXISTS books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INTEGER NOT NULL CHECK (year >= 1000 AND year <= 3000),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_books_author ON books(author);
CREATE INDEX IF NOT EXISTS idx_books_year ON books(year);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_books_updated_at 
    BEFORE UPDATE ON books 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO books (title, author, year, price) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 12.99),
('To Kill a Mockingbird', 'Harper Lee', 1960, 14.99),
('1984', 'George Orwell', 1949, 13.99),
('Pride and Prejudice', 'Jane Austen', 1813, 11.99),
('The Catcher in the Rye', 'J.D. Salinger', 1951, 15.99)
ON CONFLICT DO NOTHING;

CREATE TABLE public.orders
(
    id serial NOT NULL,
    customer_id integer NOT NULL,
    book_id integer NOT NULL,
    quantity integer NOT NULL,
    total_price double precision,
    status text,
    order_date date DEFAULT now(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.orders
    OWNER to postgres;
