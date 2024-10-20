---
title: "Back Propagation Using New Definition"
layout: post
mathjax: true
excerpt: "This article will use the notations used from the previous blog: \"New Definitions for Neural Network Operations\" and discuss how the notations may change for the backpropagation process"
---

In this article I will use the notations used from the previous blog [New Definitions for Neural Network Operations](https://ariqahmer.github.io/new-definitions-for-neural-network-operations/) and discuss how the notations may change for the backpropagation process.

## 1. Definitions
Let us first familiarize ourselves with the standard backpropagation strategy. Our main objective is to find the **optimal** weights connecting to each neuron in each layer. We also note that our **inputs and bias** terms remain constant in each layer. Hence, if we assume the following:

Our inputs consist of $\{h_0, h_1, h_2, ..., h_{n-1}, 1\}$ which have $n-1$ features with a bias value of $1$ in a layer $h$. The bias value of $1$ prevents a case where all input values from $h_0$ to $h_{n-1}$ are all $0$. Hence, if the sum of the products are calculated, the value of the node in the next layer will also be $0$.

$\{w_0, w_1, w_2, ..., w_n\}$ are our weights for all $n$ inputs from layer $h$.

### 1.1. Sum of weights and bias
Then we can obtain our prediction $y$, using the following expression:

$$y = \sum^{n}_{i=0} h_{i}w_{i}$$

If we use vectors/matrix notations, we can obtain the following expressions instead. However we will be using the "sum of products" notation:

$$y = \vec{w} \cdot \vec{h} \quad \text{or} \quad y = \textbf{w}^\text{T}\textbf{h}$$

### 1.2. Mapping to probability space using a non-linear Activation Function
One we obtain $y$, it's easy to note that $y \in (-\infty, \infty)$. Therefore  we need a way to normalize the values between $0$ and $1$, such that, $y \in [0, 1]$. This helps us to convert our output into values of probabilities. Functions that do such are called **activation** functions in the context of neural networks. These activation functions are usually **non-linear**. For our example, I am going to use the **logistic** function, also known as sigmoid function, denoted as $\sigma(x)$. Our activation function (in this case the logistic function) will take the output of the sum of our products $y$, and normalize its values in the range $[0, 1]$. This operation is as follows:

#### Definition of $\sigma(x)$ 

$$\sigma(x) = \frac{1}{1 + e^{-x}} \quad \text{ where $e$ is Euler's constant}$$

#### Normalizing the value of $y$
If we let $s$ be the normalized output of $y$, then:

$$s = \sigma(y)$$

### 1.3. Calculating error
To calculate the error between our predicted value $y$ and the ground truth $t$, we have to define an error function. In our case, we use the **Mean Squared Error**, defined by the function $E$, as defined below:

$$E(t, s) = \frac{1}{2} (t - s)^2$$

Note that the $\frac{1}{2}$ is **not part of the mean**. It is used as a constant that will be useful during the backpropagation process. **Note:** that this **works because** our ground truth $t$ is **also normalized** in the range $[0, 1]$.

## 2. Backpropagation
**Backpropagation just finds the gradients of the *errors of NODES with respect to weights* $-$ PROPAGATING BACKWARDS to each layer** . That's it! But from our definitions above, it is clear that our weights $w$, aren't variables in the error function $E$. Well at least, **not directly**. But it **is** there! Let's see the breakdown.

### 2.1. The Gradient
We know that $s$ is just the output for the function $\sigma$. So we can, in essence, just note the implications:

$$s \Rightarrow s(y) \Rightarrow \sigma(y)$$

Ahh! But there's more! We can also note that the variable $y$ itself is also a function. How so? Well, from our previous implications, we can also imply that:

$$y \Rightarrow y(\vec{w},\vec{h}) = \sum^{n}_{i=0} w_{i} \cdot h_{i}$$

Meaning, in essence, we can breakdown as follows:

$$E(t, s(y(w,h))) = \frac{1}{2} (t - s(y(w,h)))$$

Note that the above (and below) expression is just for **one** weight. Since we established that $h$ is constant, and we need to optimize the weight variable $w$, the following **chain rule** can be used to find the derivative of the error function $E$ with respect to (wrt) $w$ as follows:

$$\frac{dE}{dw} = \frac{dE}{ds} \times \frac{ds}{dy} \times \frac{dy}{dw}$$

### 2.2. The Update (Learning step) - Stochastic Gradient Descent
Gradient descent is an iterative formula that finds the optimal value for a function. The gradient descent algorithm is given below, where the value of $x$ that yields the optimum value for a function $f(x)$:

$$x_{i+1} = x_{i} - \eta \cdot x_{i} \cdot f'(x_i)$$

where:
- $f'(x_i)$ is the derivative of the function $f(x)$ evaluated at point $x_i$
- $\eta$ is the learning rate. It determines how "quickly" it should try and learn (you can think of it as the confidence).
- $x_i$ is the current "optimum" value of $x$, which is used to calculate the next (hopefully better) optimum value $x_{i+1}$.

From the expression above, we can note that we are trying to **optimize an arbitrary function $f(x)$ with respect to the variable $x$**.
Similarly, during the **backpropagation** process, we are trying to **optimize the *error* function $E$, with respect to the weight $w$**.

**Note** that *optimizing a function* means **either** find a value that, when input in my function, gives the *minimum* value the function can produce ***(minimizing)***, **or**, find a value that, when input in my function, gives the *maximum* value the function can produce ***(maximizing)***. In our problem's context, we are dealing with an *error function*. So naturally, we want our error to be as low as possible i.e. ***minimize our error function $E$***.

Therefore, putting it all together, "The Update" happens i.e. our weight *learns*, when the gradient descent algorithm is applied. Therefore, to update our weight, we use the following expression:

$$w_{i+1} = w_{i} - \eta \cdot w_i \cdot \frac{dE}{dw_i}$$

## 3. Using the New Notation
Using the new notations from [my previous article linked here](https://ariqahmer.github.io/new-definitions-for-neural-network-operations/), we can define the following variables (with very loose notations):
1. $w(p_n, q_m)$ is the single weight that associates the value of the $n^{\text{th}}$ node in the current layer $p$, with the $m^\text{th}$ node in the next layer $q$.
2. The output value of $\Gamma(P, W_{q_m})$, where $P = \{p_0, p_1, p_2, ..., p_{n-1}, 1\}$ is the value of node $q_m$.
3. The set function $\Gamma^* (P, W_{Q_{h-1}})$ produces all the **normalized values for the nodes** $A(q) \in Q_h$ for a given layer $h$.
4. The arbitrary error function $E(R, Q_h)$ is used to calculate the error between the ground truth $R$ and the output $Q_h$. Note that $R, Q_h \in \mathbb{R}^{a \times b}$ for $a,b \in \mathbb{N}$.

### 3.1. Backpropagation
Therefore, using the above definitions, we can now write the following:

$$\frac{d E(R, Q_h)}{d w(p_n, q_m)} = \frac{dE(R, Q_h)}{dA(q_m)} \times \frac{dA(q_m)}{dq_m} \times \frac{dq_m}{dw(p_n, q_m)}$$

where $q_m \in Q_h$

This above notation captures the detailed calculation to update a simple weight $w(p_n, q_m)$ from node $p_n$ to $q_m$. But if we introduce our set-function notation, then we can calculate the gradients for **all** the weights $W_Q$ for a given layer $Q$ as follows:

$$\frac{dE}{dW_Q} = \frac{dE}{d \Gamma^*_Q} \times \frac{d \Gamma^*_Q}{d \Gamma_Q} \times \frac{d \Gamma_Q}{dW_Q}$$

Here:

$$\frac{d \Gamma^*_Q}{d \Gamma_Q} = \{A'(q) \quad | \quad q = \Gamma(P, W_q)\}$$

But since we know that $q \in Q$, and $W_Q$ contains all weights needed for the **layer** $Q$, then we can further simplify it (loosely) to:

$$\frac{d \Gamma^*_Q}{d \Gamma_Q} = \Gamma^{*'}_{Q}(P, W_Q) = A'(Q)$$

Which means the derivative of the activation function $A'$ is applied to all nodes $q \in Q$. We can also note a similar simplification for the last term as:

$$\frac{d \Gamma_Q}{d W_Q} = \Gamma'(P, W_Q)$$

### 3.2. Gradient Descent
Now that we have the notations clearly defined, we now have the following iterative function using the gradient descent algorithm:

$$W_Q := W_Q - \eta \cdot W_Q \cdot \frac{dE}{dW_Q}$$

## 4. Conclusion
The iterative expression in section 3.2 encapsulates the updating/learning of all the weights $W_Q$ in layer $Q$. It should be **strongly noted that** I deliberately chose to represent the function, responsible for *summing* the products of weights and inputs, in an arbitrary manner, in this case with the function $\Gamma$. This is because, as I have stated in my previous blog, I intend to investigate the effects of **non-linear combinations** of the weights and inputs.

Until next time, I am signing off...

-- A A