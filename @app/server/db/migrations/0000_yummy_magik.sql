CREATE TABLE `posts` (
	`id` text,
	`title` text NOT NULL,
	`content` text,
	`createdAt` text DEFAULT (CURRENT_TIMESTAMP)
);
