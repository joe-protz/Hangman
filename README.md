# Links
- [Portfolio](joe-protz.github.io)
- [Repo](https://github.com/joe-protz/Hangman)
- [LinkedIn](linkedin.com/in/joe-protz)

# Hangman 
This app was developed with the intention that a teacher may play this game with their students over screenshare or in person. It is kid friendly, taking the concepts of Hangman without the actual picture or depiction of a man.

## User Stories
- As a user I would like to be able to enter how many guesses a should be allowed before game is over
- As a user I would like to be able to enter the word that students will attempt to figure out
- As a user I would like to be able to click on a letter to guess the letter

## Planning Story
I wanted to use React for this project for two main reasons. One, if it is used in a school with bad wifi, a Single Page Application would only need to load once, and then be usable indefinitely. Two, Hangman felt like a very state-like Application. I had the idea to have the game's state stored in App.js and to pass it down to all needed components. I am happy to say that this worked great and is extremely responsive! Overall, I felt as though this was a decent challenge, but I was able to complete MVP in one full day and get it available to teachers and students quickly.

After I found myself with some free time, I took this opportunity to work on some new skills and improve some others. I decided that with the lack of complexity in the app design, it would be a perfect time for me to work on styling and design.

My first decision was to include animations. I did some research and found the library [react-springs](ract-spring.io) and it looked perfect. I had the goal of transitions between routes, and so I began working on it. It turns out that the examples all were using functional components, so I had to refactor my entire App.js into a functional component. It was a great learning process and in the end, I tackled two birds with one stone. I was able to add animations, and my code was much cleaner. 

Next, was adding transitions for various elements. This kicked my ass. It took me a good 20 hours over 2 days just to get a single one to work. Countless stack overflow, just experimenting, reading docs, asking for help, and more. Finally, the 'aha' moment. In the docs, it seemed you just add the 'style' prop to any component, even a custom one. But here's the thing... If your custom component is returning another component,you better pass it along down the chain. 

Lets say we have an app where we render the style, and then pass it along to a component1, which then renders component2. Let's see how that actually works.
```jsx
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops'

const app = () => {
  return (
    // we define a spring prop, meant to only animate a component mounting
       <Spring
       // start the transition in at opacity 0, then transition it to 1
              from={{ opacity: 0}}
              to={{ opacity: 1 }}
            >
            {/* The props are then sent to your custom component. */}
              {props => (
                <Component1 style={props}/>
              )}
            </Spring>
  )
}
```
```diff
// here we define our component 1. In my first 2 days, this is the step I missed.
const Component1 = ({style}) => {
  return (
-    <Component 2>
+    <Component2 style={style}>

  )
}

```

```js
const Component2 = () => {
  return (
    //the final element being rendered must be animated.
    <animated.div></animated.div>
  )
}
```


Finally.. IT WAS ALIVE!
This was exhausting, but once I got it, it really opened up some cool doors. Now it was typical CSS struggles for a few days. 

So now, I had an animated app. Cool! Just had to work out a few bugs that I introduced during development, and I was ready to deploy.... Well.. Almost.

Turns out, my webpack config was not compatible with react-springs. So while my app was working on local, it wouldn't build! After days I finally found this [stack overflow question](https://stackoverflow.com/questions/45671597/failed-to-minify-the-code-from-this-file) in which I finally found out somebody similar enough to me. You see this template I had worked from had ejected the react-scripts, and so I couldn't just update via typical React ways. I had to directly modify the config. FOR NOW, I have simply deleted the uglify plugin, as I am totally open about my code. In the future, I would like to add the Terser Plugin, as mentioned within the question.

Okay. Awesome. We are animated, baby. Now some good old CSS. I wanted to really make this look professional, as during my time at General Assembly, we made all projects during 3-4 day sprints. While I did try to style them, I was brand new and had only a few days to hit the MVP requirements. This time I meant business.... SHADOWS!

I added shadows, and offset the bg-colors to make different pieces of the box-model stand out to the eye. I added a theme, and made it so that all of my colors were custom. Checkboxes, placeholder text, shadows, everything. I was finally happy with the look of one of my apps for once!

Last but not least, we added fireworks, via [fireworks](https://www.npmjs.com/package/fireworks ). This was actually fairly straightforward. It's a custom component. So what did I do? I just mapped over a custom range to create several of these components. When the user triggered a win, I showed them! When I show them, I set a timer for 5 seconds, to where I hide them again. 

What a fantastic experience creating this app was. It was full of challenges I didn't expect, but I am so happy to have persevered through them. A few times a week, my buddy lets me know something cool like 'the kids absolutely loved the fireworks', and it makes my day.


## Unsolved Problems
- Code needs some refactoring
- Maybe a score tally
- Use Context API to clean up code significantly


