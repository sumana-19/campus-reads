import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import redis from "@/database/redis";

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1m"), //slidingWindow or fixed window
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
