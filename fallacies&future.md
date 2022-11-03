 ## Which of the fallacies of the distributed system does your system violate, and how.


Latency is zero. Our program violates this one because it assumes that all players have similiar latency which could couse syncronization problems for players who have high latency. Since request are processed with first-come-first-served basis this latency issue should not have any impact on the program itself.



## What needs to be added to your system be used to be integrated/extended by another system.


Because the project has a separate frontend and gamelogic backend, integration to other systems should be relatively straight forward. For example lets say that someone is developing a game site which has multiple games on it. If these gamese are hosted separately then adding our backend to their frontend would be relatively straight forward and the same could be said about our frontend.


## Future work


Currently there is only one session and generating another one would require a new server. Implementing multi-session hosting in one server could be a good future goal.