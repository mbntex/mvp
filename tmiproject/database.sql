DROP DATABASE moods; /*for testing only*/
CREATE DATABASE moods;

USE moods;

CREATE TABLE  mooddata (
ID                  INT             NOT NULL AUTO_INCREMENT,
ownerName           VARCHAR(50),
message             VARCHAR(1000),
moodDataPositive    DECIMAL(5, 4),
moodDataNeutral     DECIMAL(5, 4),
moodDataNegative    DECIMAL(5, 4),
moodLabel           VARCHAR(10),
PRIMARY KEY (ID)
);



INSERT INTO mooddata (ownerName, message, moodDataPositive, moodDataNeutral, moodDataNegative, moodLabel) VALUES ('Bill', 'Hey there man, how are you doing? What a great day!', 0.879456, 0.004546646, 0.46757, 'pos' );
INSERT INTO mooddata (ownerName, message, moodDataPositive, moodDataNeutral, moodDataNegative, moodLabel) VALUES ('Craig', 'I am super bummed about the weather.', 0.4743, 0.6236, 0.8454, 'neg' );
INSERT INTO mooddata (ownerName, message, moodDataPositive, moodDataNeutral, moodDataNegative, moodLabel) VALUES ('Bill', 'Well, we can do something fun I guesss.', 0.335, 0.734, 0.3467, 'neutral' );

