left_counts <- tibble(bin = seq(1,10,1), 
                     count = c(1, 1, 2, 2, 4, 6, 7, 7, 6, 4))

right_counts <- tibble(bin = seq(1, 10,1), 
                 count = c(4, 6, 7, 7, 6, 4, 2, 2, 1, 1))


center_counts <- tibble(bin = seq(1, 10,1), 
                       count = c(1, 2, 4, 6, 7, 7, 6, 4, 2, 1))

samples <- center_counts %>%
  mutate(upper = bin * 10, lower = lag(upper),
         lower = if_else(is.na(lower), 0, lower)) %>%
  group_by(bin) %>%
  nest() %>%
  mutate(samples = map(data, ~runif(.x$count, .x$lower, .x$upper))) %>%
  pull(samples) %>%
  unlist() %>%
  enframe(name = "sample", value = "size")

ggplot(samples, aes(x = size)) + 
  geom_histogram(breaks = seq(0,100,10))
 
