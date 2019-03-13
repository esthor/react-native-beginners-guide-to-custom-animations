# A Beginner's Guide to Custom Animations in React Native

> There are a lot more things going on and a lot more you can do with animations. This is just a starter.

Think First. Think Again. Think a Third Time. Then Code.

As with most coding solutions, you should spend a lot of your time thinking before doing any coding. This rule of thumb is especially good to follow with animations. It's very easy to get excited about one solution path and end up with a suboptimal animation that is both not intuitive or informative and also resource heavy and annoying.

## What are Animations? And Where are they used?

Changing the view values or frames to give the illusion of movement.

Animations are used all over the place in good UIs and UI libraries.

- Navigation is a big one. Sliding/Transitioning from one view to another.
- Information givers - Loading screen animations let users know you haven't forgotten about them, but you're working hard
- Attention Grabbers to grab user focus - bouncing notifications/errors or transitoning elements across the screen
- Gestures/Touch - It's very important to think about gestures for mobile, since that's the main source of user feedback/interaction

## Animations in React Native

### Where should you start with Animations for React Native?

[The React Native Animated API](https://facebook.github.io/react-native/docs/animated) is definitely the first place to start. It's not overly complicated, and most animated libraries built for react native rely on or derive from it.

## How to think about animations

Well, again, think before you code >= 3 times...

Animations are complicated. A good approach is to break down animations into component parts and utilize a _composition_ technique. This helps us humans reason about animations in an easier way. If you can break you animation into a system of component parts that compose it, you have less moving parts to hold in your short term memory at once. This is a good thing.

What do we want to do first? Annoying fading red box? Cool. What is that? A box that, when you press a button, fades in, and when you press the same button, fades back in? Sounds easy. Let's look at the `SimpleButton` example. The code for this component is in the `/Examples` folder, along with the rest. They are all being called and rendered in our `App.js` file in the root `native` folder. Once you install and get up and running (see how to below), just go step through the code until you understand a piece, then try playing with it. What happens if you change the input/output ranges on an interpolation? What about targeting other style props? How about using custom Easing functions? What about using `Animated.decay` instead of `Animated.timing`? Play around. The rest of this post is more about things to keep in mind and suggestions on ways to reason about animations in react native. Have fun!

## Install

**To get this all started, clone this repo, and run the following in the `native` folder:**

`npm install` or `yarn install`

This will install all the packages/dependencies.

Then, if you are on a mac and have XCode installed, run:

`react-native run-ios`

This will install the project as an app on your default iOS simulator.

### Animated Values

The Animated API that comes with React Native comes with a lot of goodies. The single most important is `Value` which cna be accessed from `Animated.Value`. You will need to create a `Animated.Value` to hold the values you want to target. Normal values won't work.
`import Animated from react-native`
`set the new Animated.Value in state`

### Setting Up the Animation

Once you've thought about what you actually want to do (in our example case, a button animation), it's time to setup the actual animation. You're most likely going to be using `Animated.timing` unless you have other use cases.

1. Setup Animated.timing function
1. Hook it up to a Button's onPress()
1. Style arrays!

Only a few components can be animated in React Native. What would happen if I animated from a width from 10 to 500 over 500ms? What would React think of reconciling that? It would freak out is what would happen, so react-native doesn't even allow it and will blow up at you if you even try.

Also good to note, we are always targeting 60fps on mobile, always. Which means, if we animate over 1000ms (1 second) we need to have results for rendering every 1/60th of a second, and if we miss that opportunity to give the native UI thread that frame, we get frame drops and glitch. Those calcs are done on the JS thread, but the renders are on the native UI thread. You can see what's going on on these 2 threads with the built-in React Native 'Perf Monitor'. Shake your device. No seriously, shake it (or in your Simulator, choose from the menu `Hardware->Shake Gesture`). This will give you debugging options and tools. Select 'Perf Monitor' and look at the numbers in 'UI' and 'JS'. You want these always to be 60. The JS thread is going to be your problem child in real-world applications where a lot is going on besides your sweet animation.

### What componennts can you Animate?

When we target a certain component, in order for the magic to work and not wreck React's reconciliation and cause a bunch of rendering side-effects, we need to attach animation values to "animateable" components. React Native gives us 4 out of the box:
_`Animateable Components: Image, ScrollView, Text, View`_
You can also use `createAnimatedComponent` to make any component Animateable, but I've not yet found the need.

### Interpolation

What is is? ...Remember math class? We are fitting a function that matches our input and output values, and mapping the output values to the input.

It's very useful for reasoning to use 1 single `Animated.Value` to drive a complex animation. That way we can just think about our animation going from 0 to 1. Then we can just think about what the different parts should do during that time. How long should that one part be?

Don't forget, if you are mapping only part of input range to an output range, use `extrapolate: clamp` so that the output range doesn't keep extrapolating values after the input range your part cares about reaches its end.

### Common pitfalls

Building animations in React Native can sometimes be frustrating. Especially when you get red error screens and don't know what to do. Here are some common reasons your animation isn't working...this is a work in progress:

- _Forgot to make the component an Animated component_

- _Need to use a transform instead of directly animating a style property_

- _Used `useNativeDriver` for an animation that drives something not supported by `useNativeDriver`_

### Native Driver

Where are our animations being computed? On the JS thread. By utilizing `useNativeDriver` we can offload a lot of that work to the native UI thread, and avoid performance problems when our JS thread is locked-up/full of stuff to do. This helps reduce frame drops and glitchy animations. But it can't be used for everything. If you want to step up your animation game, once you are comfortable with the Animated API, try out the `react-native-reanimated` library. With Reanimated, you write your animations in a low-level API that ships all your animations to native.: [React Native Reanimated](https://github.com/kmagiera/react-native-reanimated)

### Best UX Practices (Or, Why You Shouldn't Use Your Animation):

- The people that are most impressed by your animation are: 1. Other developers 2. Product Managers 3. Designers 4. Sales ...way down the line...end users. Use them sparingly, intentionally, and run them by non-technical people.

- Don't attach animations to user navigation (like scrolling) just generally, write your code to limit it to one time. If users are scrolling back up, they are looking for info/data not your animation, don't annoy them.

- If your animation is not conventional, or reduces clarity in your UI, think very carefully about whether or not you should include it.

## RESOURCES

[Animated API & Animations - React Native Docs](https://facebook.github.io/react-native/docs/animated)

['Can it be done in React Native?' YouTube Series](https://www.youtube.com/channel/UC806fwFWpiLQV5y-qifzHnA)

[Code Daily](https://codedaily.io/technology/2)

[React Native Reanimated](https://github.com/kmagiera/react-native-reanimated)

[React Native Gesture Handler - Handle complex gestures, easily, and natively](https://github.com/kmagiera/react-native-gesture-handler)

[Totally different, non-interactive, fancy animations (Shipping Adobe After Effects animations -> React/React-Native)](https://airbnb.io/lottie/)
