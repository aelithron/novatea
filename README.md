# novatea ![IMG](https://hackatime-badge.hackclub.com/U08RJ1PEM7X/novatea)
Nova's personal website and blog! Made for Hack Club [Flavortown](https://flavortown.hackclub.com)! \
<a href="https://notbyai.fyi" target="_blank">
  <img src="https://raw.githubusercontent.com/aelithron/novatea/refs/heads/main/public/not-by-ai.svg" alt="Developed by a human, not by AI!">
</a>

## Features
- Dynamic widgets
- A fully-featured custom blog, including an RSS feed
  - Also features full Markdown support!
- A portfolio of my projects
- Pages talking about myself and my accounts
- Full admin panel for changing blog posts and projects

## Usage
Using this is quite simple! Just go to [novatea.dev](https://novatea.dev) in any web browser!
### Self-Hosting
I have no clue why you want to self-host my website, but ok! I suggest running it in Docker.
1. Set up environment variables:
- `DATABASE_URL`: A valid PostgreSQL connection string, in the format of `postgres://<user>:<password>@<host>:<port>/<database>`.
- `ADMIN_TOKEN`: Any text, but I would suggest picking a secure password. This will allow anyone who knows it to read/publish/edit/delete blog posts and projects.
2. Apply database migrations. This essentially just creates the tables that the site needs to work. I'm not really sure how to describe how to do this, but you essentially just need to clone the source code and run `npx drizzle-kit push`. Figure it out, I guess :3
3. Deploy the one of the following Docker configs.
**Make sure to fill in the environment variables!**
#### Docker Compose
```yaml
services:
  novatea:
    image: ghcr.io/aelithron/novatea:latest
    container_name: novatea
    restart: unless-stopped
    environment:
      DATABASE_URL: ""
      ADMIN_TOKEN: ""
    ports:
      - 3000:3000
```
#### `docker run` Command
```bash
docker run -d \
  --name novatea \
  -p 3000:3000 \
  -e DATABASE_URL="" \
  -e ADMIN_TOKEN="" \
  --restart unless-stopped \
  ghcr.io/aelithron/novatea:latest
```
## Credits
I was inspired by some other personal sites :3 \
Here's some links (these are the main ones I was inspired by, bold ones are my friends):
- **https://parkalex.dev**
- **https://shymike.dev**
- https://kibty.town
- https://lily.pet