# primost

http server that catch sending emails requets, put them in a prioritized queue, and treat them in a separate process.

#### Principal packages used

- [express](https://www.npmjs.com/package/express)
- [bull](https://www.npmjs.com/package/bull)
- [nodemailer/mailcomposer](https://www.npmjs.com/package/nodemailer)
- [aws-sdk](https://www.npmjs.com/package/aws-sdk)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Prerequisities

You must have a `redis` instance available.
A `docker-compose.yml` file is includeed if you need it.

Primost must be configured with a `config.js` file placed at the projet root. There is a file named [`config.sample.json`](./blob/master/config.sample.js) to help you do that.

You should copy this file with `cp config.sample.js config.js` and edit it with your favorite text editor.

## Configuration

> The following steps will all be a part of the `config.js` file.

### Application configuration

|key|value|description|default|required|
|---|---|---|---|---|
|`NODE_ENV`|`developement` or `production`||`developement`|**yes**|
|`PORT`|Number|http server port|`3000`|**yes**|
|`END_POINT`|String|Server endpoint where you'll post requests|`/`|**yes**|
|`JWT_SECRET`|String|Secret that will be used by JWT to decrypt data|`shhhh`|**yes**|
|`EMAIL_DELAY`|Number|Time in **ms** the process has to wait before sending another email. AWS SES have some limitations, like 12 emails/sec|`100`|**yes**|
|`DELAY_ON_ACKNOWLEDGE`|Boolean|When `true`, waits for SES response before waiting `EMAIL_DELAY` between 2 jobs. When `false`, a job is executed every `EMAIL_DELAY`. **`false` increses significantly sending rate**|false|**yes**|
|`RETRY_ON_THROTTLE`|Boolean|When `true`, if maximum sending rate per day is exceeded, put the job back in the queue with a `RETRY_DELAY` delay.|false|**yes**|
|`RETRY_DELAY`|Number|Time in **ms**|`1000 * 60 * 60` (1 hour)|**yes**|

### Logger configuration

|key|value|description|default|required|
|---|---|---|---|---|
|`LOG_IN_CONSOLE`|Boolean|Api calls will be logged in console|true|**yes**|
|`LOG_IN_FILE`|Boolean|Api calls will be logged in file in `./LOG_DIRECTORY/consumer.log`|true|**yes**|
|`LOG_DIRECTORY`|String|Directory where the log files will be stored. The path is relative to project root directory.|`log`|**yes** (if `LOG_IN_FILE === true`)|

### Email configuration

|key|value|description|default|required|
|---|---|---|---|---|
|`EMAIL_KEYS_MAPPING`|Object|See [Fields mapping](#fields-mapping)|--|**yes**|
|`ATTACHMENTS_KEYS_MAPPING`|Object|See [Fields mapping](#fields-mapping)|--|**yes**|


### Redis configuration

Since Primost uses bull wich uses redis, we need to provide redis configuration.

|key|value|description|default|required|
|---|---|---|---|---|
|`REDIS_HOST`|Number||`6379`|**yes**|
|`REDIS_PORT`|String||`localhost`|**yes**|
|`REDIS_PASSWORD`|String||`false`|*no*|

### AWS SES configuration

Since Primost uses AWS SES to send emails, we need to provide AWS configuration.

|key|value|description|default|required|
|---|---|---|---|---|
|`AWS_ACCESS_KEY_ID`|Number||*none*|**yes**|
|`AWS_SECRET_ACCESS_KEY`|String||*none*|**yes**|
|`AWS_REGION`|String||*none*|**yes**|


### Fields mapping

For emails to be formated in the right way, you must provide data to certain keys. I believe that every project is different, and those keys might be different as well. 

For example the `bcc` field in french is `cci`, as well for `attachments` that could be named `pj`.

Primost can adapt to these differences and propose a mapping tables, described in objects :

```javascript
// config.js
const config = {
  EMAIL_KEYS_MAPPING: {
    // 'your term': 'primost term'
    priority: 'priority',
    sujet: 'subject',
    from: 'from',
    fromName: 'fromName',
    replyto: 'replyTo',
    returnPath: 'returnPath',
    to: 'to',
    msg_raw: 'text',
    msg_html: 'html',
    cc: 'cc',
    bcc: 'cci',
    pj: 'attachments',
  },
  ATTACHMENTS_KEY_MAPPING: {
    // 'your term': 'primost term'
    nom: 'filename',
    url: 'path',
    contentType: 'contentType',
  }
}
```

> Note : **All fields must be provided, even if there is no mapping to setup**
 
## Usage

To use Primost, you will have to make a `POST` call to the endpoint `END_POINT`.

The token that will have to be sent is the email data set `JWT` encrypted with the `JWT_SECRET`.

Ex: 
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

The minimum required fields are :

```javascript
const REQUIRED_FIELDS = [
  'subject',
  'from',
  'to',
  'text',
  'html',
];
```

## Start production

```shell
# create config file frome the sample
cp config.sample.js config.js

#edit your config file
nano config.js 

# run redis
docker-compose up redis -d 

# install dependencies
yarn

# start producer and consumer
yarn start:producer:prod
yarn start:consumer:prod

# or stop them
yarn stop:producer:prod
yarn stop:consumer:prod
```

## Start dev

```shell
# create config file frome the sample
cp config.sample.js config.js

#edit your config file
nano config.js 

# run redis
docker-compose up redis -d 

# install dependencies
yarn

# yarn dev builds and start all process
yarn dev
```
