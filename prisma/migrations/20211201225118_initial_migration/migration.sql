-- CreateTable
CREATE TABLE `typecho_comments` (
    `coid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `cid` INTEGER UNSIGNED NULL DEFAULT 0,
    `created` INTEGER UNSIGNED NULL DEFAULT 0,
    `author` VARCHAR(150) NULL,
    `authorId` INTEGER UNSIGNED NULL DEFAULT 0,
    `ownerId` INTEGER UNSIGNED NULL DEFAULT 0,
    `mail` VARCHAR(150) NULL,
    `url` VARCHAR(255) NULL,
    `ip` VARCHAR(64) NULL,
    `agent` VARCHAR(511) NULL,
    `text` TEXT NULL,
    `type` VARCHAR(16) NULL DEFAULT 'comment',
    `status` VARCHAR(16) NULL DEFAULT 'approved',
    `parent` INTEGER UNSIGNED NULL DEFAULT 0,

    INDEX `cid`(`cid`),
    INDEX `created`(`created`),
    PRIMARY KEY (`coid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typecho_contents` (
    `cid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(150) NULL,
    `slug` VARCHAR(150) NULL,
    `created` INTEGER UNSIGNED NULL DEFAULT 0,
    `modified` INTEGER UNSIGNED NULL DEFAULT 0,
    `text` LONGTEXT NULL,
    `order` INTEGER UNSIGNED NULL DEFAULT 0,
    `authorId` INTEGER UNSIGNED NULL DEFAULT 0,
    `template` VARCHAR(32) NULL,
    `type` VARCHAR(16) NULL DEFAULT 'post',
    `status` VARCHAR(16) NULL DEFAULT 'publish',
    `password` VARCHAR(32) NULL,
    `commentsNum` INTEGER UNSIGNED NULL DEFAULT 0,
    `allowComment` CHAR(1) NULL DEFAULT '0',
    `allowPing` CHAR(1) NULL DEFAULT '0',
    `allowFeed` CHAR(1) NULL DEFAULT '0',
    `parent` INTEGER UNSIGNED NULL DEFAULT 0,

    UNIQUE INDEX `slug`(`slug`),
    INDEX `created`(`created`),
    PRIMARY KEY (`cid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typecho_fields` (
    `cid` INTEGER UNSIGNED NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `type` VARCHAR(8) NULL DEFAULT 'str',
    `str_value` TEXT NULL,
    `int_value` INTEGER NULL DEFAULT 0,
    `float_value` FLOAT NULL DEFAULT 0,

    INDEX `float_value`(`float_value`),
    INDEX `int_value`(`int_value`),
    PRIMARY KEY (`cid`, `name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typecho_links` (
    `lid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(200) NULL,
    `url` VARCHAR(200) NULL,
    `email` VARCHAR(200) NULL,
    `sort` VARCHAR(200) NULL,
    `image` VARCHAR(200) NULL,
    `description` VARCHAR(200) NULL,
    `user` VARCHAR(200) NULL,
    `order` INTEGER UNSIGNED NULL DEFAULT 0,

    PRIMARY KEY (`lid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typecho_mail` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `content` TEXT NOT NULL,
    `sent` BOOLEAN NULL DEFAULT false,
    `log` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typecho_metas` (
    `mid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NULL,
    `slug` VARCHAR(150) NULL,
    `type` VARCHAR(32) NOT NULL,
    `description` VARCHAR(150) NULL,
    `count` INTEGER UNSIGNED NULL DEFAULT 0,
    `order` INTEGER UNSIGNED NULL DEFAULT 0,
    `parent` INTEGER UNSIGNED NULL DEFAULT 0,

    INDEX `slug`(`slug`),
    PRIMARY KEY (`mid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typecho_options` (
    `name` VARCHAR(32) NOT NULL,
    `user` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `value` TEXT NULL,

    PRIMARY KEY (`name`, `user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typecho_relationships` (
    `cid` INTEGER UNSIGNED NOT NULL,
    `mid` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`cid`, `mid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `typecho_users` (
    `uid` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NULL,
    `password` VARCHAR(64) NULL,
    `mail` VARCHAR(150) NULL,
    `url` VARCHAR(150) NULL,
    `screenName` VARCHAR(32) NULL,
    `created` INTEGER UNSIGNED NULL DEFAULT 0,
    `activated` INTEGER UNSIGNED NULL DEFAULT 0,
    `logged` INTEGER UNSIGNED NULL DEFAULT 0,
    `group` VARCHAR(16) NULL DEFAULT 'visitor',
    `authCode` VARCHAR(64) NULL,

    UNIQUE INDEX `name`(`name`),
    UNIQUE INDEX `mail`(`mail`),
    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
