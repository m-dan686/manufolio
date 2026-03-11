CREATE DATABASE manufolio;

USE manufolio;

CREATE TABLE admins (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    github_url VARCHAR(255),
    demo_url VARCHAR(255),
    ppt_url VARCHAR(255),
    cover_image VARCHAR(255),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE technologies (
    tech_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE
);

CREATE TABLE project_technologies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    tech_id INT,
    FOREIGN KEY (project_id) REFERENCES projects (project_id) ON DELETE CASCADE,
    FOREIGN KEY (tech_id) REFERENCES technologies (tech_id) ON DELETE CASCADE
);

CREATE TABLE project_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    image_url VARCHAR(255),
    FOREIGN KEY (project_id) REFERENCES projects (project_id) ON DELETE CASCADE
);

CREATE TABLE project_views (
    view_id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT,
    visitor_ip VARCHAR(50),
    viewed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects (project_id)
);

CREATE TABLE resume_files (
    resume_id INT AUTO_INCREMENT PRIMARY KEY,
    file_url VARCHAR(255),
    version VARCHAR(20),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE resume_downloads (
    download_id INT AUTO_INCREMENT PRIMARY KEY,
    resume_id INT,
    visitor_ip VARCHAR(50),
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (resume_id) REFERENCES resume_files (resume_id)
);

CREATE TABLE visitors (
    visitor_id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(50),
    browser VARCHAR(200),
    country VARCHAR(100),
    visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150),
    email VARCHAR(150),
    phone VARCHAR(20),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE seo_metadata (
    page_id INT AUTO_INCREMENT PRIMARY KEY,
    page_name VARCHAR(100),
    meta_title VARCHAR(255),
    meta_description TEXT
);