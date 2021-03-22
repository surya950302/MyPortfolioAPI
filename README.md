# 👷 `worker-template` Portfolio

A template for kick starting a Cloudflare worker project.

[`index.js`](https://github.com/cloudflare/worker-template/blob/master/index.js) is the content of the Workers script.

#### Wrangler

To generate using [wrangler](https://github.com/cloudflare/wrangler)

```
wrangler generate projectname https://github.com/cloudflare/worker-template
```

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).


# How to run the application
As this project s already hosted on heroku all we need are the following links to see what are the different responses the API gives.
1- https://my-worker.surya950302.workers.dev/links (this will give a dynamic HTML response with my profile details, done using html rewriter)
2- https://my-worker.surya950302.workers.dev/static ( this will give a static predefined HTML response with my profile details, done using a statndard HTML code)
3- https://my-worker.surya950302.workers.dev (this will give a JSON respnse with my profile details that can be used in different applications if needed)
