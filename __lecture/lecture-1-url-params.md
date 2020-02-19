# 3.2.1 - URL Params

---

How do you feel about this? Is this DRY?


<div class='two-col'><div>

```js
// ...
//if they type in:
/question/6
//
app.get('/question/:number', (req, res) => {
    //theres a number there but how do i get access to it?
    const number = req.params.number;
    // in the request object, theres another object called params, and whatever is passed from number as the end point will become the value of the key number of params. 
//
exercisesP1['q${number}]();
});

//console log
console.log(number); // 6

 });
 
 
 const app = express();

app.get('/question1', q1)
app.get('/question2', q2)
app.get('/question3', q3)
app.get('/question4', q4)
app.get('/question5', q5)
app.get('/question6', q6)
app.get('/question7', q7)
app.get('/question8', q8)
app.get('/question9', q9)
app.get('/question10', q10)
```

</div><div>

```js
// ...

```

</div></div>

---