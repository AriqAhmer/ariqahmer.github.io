---
title: "New Definitions for Neural Network Operations"
layout: post
mathjax: true
excerpt: "I am currently investigating the possibility of having non-linear combinations in neural networks, how it may be computed (if at all), and its performance impact compared to the current linear combination in neural network."
---

I am currently investigating the possibility of having non-linear combinations in neural networks, how it may be computed (if at all), and its performance impact compared to the current linear combination in neural network.

## New Notation
There is the pseudo-standard notation for denoting which weight belongs to which hidden node using a similar form of $$w^{(0)}_{h_0}$$  which represents the $$0^{\text{th}}$$ weight connecting to hidden node $$h_0$$ . This notation works (to an extent) since the operations are mostly linear and don't need to deal with exponents as often. I have skipped over notations used for other terms deliberately as I am assuming the person who is reading this should already be familiar with them.

Since I am investigating non-linear combinations, I am going to use the following notations for the rest of my investigations. Keep in mind this isn't anything final and the notations are expected to change. If you are unfamiliar with the current notations, then do not worry. As long as you understand the concept of Machine Learning using Multilayer Perceptron model, you should be able to follow. Again, the CONCEPT and NOT the EXACT NOTATIONS USED!!!

## Re-Writing Current Notation
In this section, I go over how the current notation can be re-written to capture the same concepts of MLPs/NNs/DNNs. I intend to use variations of these notations for my investigations.

### Variables
Below are the variables I tend to use for my investigations:

$$p$$ is the previous node.

$$q$$ is the next node.

$$w(p, q) \in \mathbb{R}$$ is the weight going from node $p$ to node $q$.

$$P = \{p_0, p_1, p_2, ..., p_{n-1}, 1\}$$ and $$p_n \in \mathbb{R}, \forall n \in \mathbb{N}$$

$$Q = \{q_0, q_1, q_2, ..., q_{m-1}, 1\}$$ and $$q_m \in \mathbb{R}, \forall m \in \mathbb{N}$$

$$|Q|$$ is the cardinality of set $$Q$$ meaning, the number of elements in $$Q$$.

$$E(\cdot, \cdot)$$ is an error function.

$$A(\cdot)$$ is an activation function.

### Functions
#### Neuron Function
The neuron function $$\Gamma$$ takes the sum of the product of input value (node) $$p \in P$$ and its associated weight value (edge) $$w(p,q) \in W_q$$. The output of $$\Gamma$$ is the value for node $$q \in Q$$.

$$ \Gamma (P, W_q) = \sum_{p \in P, w \in W_q} p \cdot w(p, q) $$

#### Layer Function
The layer function $$\Gamma^{*}$$ outputs $$m$$ nodes that describe a layer $$Q$$ in a Multilayer Perceptron (Deep Neural Network) model. It takes all the points in $$P$$ and the weights $$W_Q$$ which is the set of all weights (edges) between all nodes in $$P$$ and $$Q$$. It can be observed that if all the nodes in $$P$$ are connected to all the nodes in $$Q$$, then the total number of edges is $$n \times m$$. This is obtained as follows:

$$ |P| = n \quad \Rightarrow \quad |W_q| = n \quad \because \quad p \in P \Leftrightarrow w(p, q) \in W_q $$

$$ |Q| = m \quad \Rightarrow \quad |W_Q| = n \times m \quad \because \quad q \in Q \Leftrightarrow W_q \in W_Q \text{ since } q \text{ connects to all } n \text{ edges in } W_q $$ 

Hence, the layer function is given as follows:

$$ \Gamma^{*} (P, W_Q) = \{A(q_m)\quad |\quad q_m = \Gamma_{m}(P, W_q), 0 \le m \le |Q|\} $$

#### Model Set
A model $$Q^*$$ is an **ordered** set where each element is a layer object i.e. the output of the layer function $$\Gamma^*$$.

$$Q^* = \{Q_{n} \quad | \quad Q_{n} = \Gamma^*(Q_{n-1}, W_{Q_n}), \quad n,m \in \mathbb{N} \text{ and } 0 \le n \le m\}$$

$$\text{if } n=0, \quad Q_0 = \{x_0, x_1, x_2, ..., x_{n-1}, 1\} \quad \text{which is the input layer}$$

$$\text{if }n = m, \quad Q_m \text{ is the final output layer}$$

### Feed Forward Lemma
From the definitions proposed above, the following can be noted:

> If a model $$Q^*$$ has $$n$$ elements i.e. $$n$$ layers, then, the model has an input layer $$Q_0$$, hidden layers $$Q_1$$ to $$Q_{n-1}$$, and an output layer $$Q_n$$.

Given that $$Q^*$$ is an **ordered set**, it follows that a **Feed Forward** operation occurs as $$n$$ increases from $$1$$ to $$n$$.

## Conclusion
In summary, we have defined a new function $$\Gamma$$ that calculates the value of a neuron $$q$$ based on the **set** of values of the neurons $$P$$ it is connected to using weights/edges $$W_q$$. We also defined a set-generating function $$\Gamma^*$$ that outputs a **set** of neurons $$Q$$ for a layer based on the neurons from the previous layer $$P$$ and **all** its associated weights $$W_Q$$. We defined the ordered set $$Q^*$$ which contains all the layers of a neural network, where the first element $$Q_0$$ is the input layer and the $$Q_n$$ is the output layer. And finally, we noted that if $$n$$ increases from $$1$$ to $$n$$ in the set $$Q^*$$, it describes the feed forward operation of a traditional neural network.
