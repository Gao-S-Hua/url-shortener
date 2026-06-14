CREATE TABLE short_url (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    short_code VARCHAR(16) COMMENT 'Short Code',
    original_url TEXT NOT NULL COMMENT 'Orignial URL',
    click_count INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'user click counter',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL COMMENT 'NULL: not delete, time: user delete time',

    UNIQUE KEY uniq_short_code (short_code),
    KEY idx_updated_at (updated_at)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 AUTO_INCREMENT = 1000;