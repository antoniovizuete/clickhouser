# [clickhouser.app](http://clickhouser.app)

## ClickHouse query runner

Clickhouser is a tool inspired on the ClickHouse built-in web client.

![Screenshot](https://user-images.githubusercontent.com/1465370/193932950-65b157a8-dd07-4cda-a80c-c64850296130.png "Screenshot")

It aims to provide some features:

- Rich SQL editor.
- Interface to give query parameters.
- Useful UI.
- Download the retreived data on multiple formats (JSON, CSV, TSV, etc)

## Disclaimer

The disclaimer document is [DISCLAIMER.md](./DISCLAIMER.md)

## Caveats

### Query parameters, null values

Since the query parameters are passed as URL parameters, null values are not supported. If you need to pass a null value, you can use `null` then the param will be received by the server as an empty string. You can use `nullif` to transform the empty string to null.

```json
{
  "param1": null
}
```

```sql
SELECT nullif('{{param1}}', '') AS param1
```

### Allow "Insecure content"

Due to Clickhouser being accessible through a secured connection (HTTPS), you can get an error if you try to perform a query against a non-secured server (HTTP). There is a couple of workarounds, but only one depends on you by allowing "Insecure content".

Click on the lock icon in the URL bar, then click "Site settings".

![](https://user-images.githubusercontent.com/1465370/194408254-a966467d-2466-4270-ae36-935a2e64800c.png)

There you will see a list of site permissions. Set "Insecure content".

![](https://user-images.githubusercontent.com/1465370/194408392-771fa206-aecd-4e28-a429-c32c6305a4e3.png)

Now your HTTPS site can access HTTP endpoint.

## Contributions

![Alt](https://repobeats.axiom.co/api/embed/acca0c69aad34ac3815c5b44ffbc5420228cdcc3.svg "Repobeats analytics image")
Contributions are what make the Open Source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a Pull Request. You can also [open an issue](http://github.com/antoniovizuete/clickhouser/issues) with the tag `enhancement`.

Don't forget to give the project a star ⭐!

1. Fork the project
2. Clone the repository
3. Create your feature branch
4. Push to your branch
5. Open a Pull Request

Many thanks!!
