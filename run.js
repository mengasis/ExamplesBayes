var jsbayes = require('jsbayes');

var prompt = require('prompt');

prompt.start();

prompt.get(['A', 'B', 'C'], function (err, result) {

    var g = jsbayes.newGraph();
    var A = g.addNode('A', ['Falso', 'Verdadero']);
    var B = g.addNode('B', ['Falso', 'Verdadero']);
    var C = g.addNode('C', ['Falso', 'Verdadero']);


    C.addParent(A).addParent(B);


    A.cpt = [0.45, 0.55]; //[ P(n1=0), P(n1=1) ]
    B.cpt = [0.9, 0.1];

    C.cpt = [
        [
            [0.95, 0.05], //[ P(n3=0|n1=0,n2=0), P(n3=1|n1=0,n2=0) ]
            [0.23, 0.77] //[ P(n3=0|n1=0,n2=1), P(n3=1|n1=0,n2=1) ]
        ],
        [
            [0.34, 0.66], //[ P(n3=0|n1=1,n2=0), P(n3=1|n1=1,n2=0) ]
            [0.01, 0.99] //[ P(n3=0|n1=1,n2=1), P(n3=1|n1=1,n2=1) ]
        ]
    ];

    /*
    n2.cpt = [
     [0.8, 0.2], //[ P(n2=true|n1=true), P(n2=false|n1=true) ]
     [0.8, 0.2]  //[ P(n2=true|n1=false), P(n2=false|n1=false) ]
    ];
    */


    g.reinit()
        .then(function (r) {

          if(result.A)
          g.observe('A', result.A);

          if(result.B)
          g.observe('B', result.B);

          if(result.C)
          g.observe('C', result.C);

            //g.observe('B', 'Verdadero');
            //g.observe('C', 'Verdadero');

        })
        .then(function (r) {

            return g.sample(10000); //likelihood weight sampling aka the inference
        })
        .then(function (r) {
            console.log('Primera Iteracion de 10.000');
            console.log("Nombre: " + g.nodes[0].name + " - Valor: " + g.nodes[0].value + " - Probabilidad: " + g.nodes[0].probs());
            console.log("Nombre: " + g.nodes[1].name + " - Valor: " + g.nodes[1].value + " - Probabilidad: " + g.nodes[1].probs());
            console.log("Nombre: " + g.nodes[2].name + " - Valor: " + g.nodes[2].value + " - Probabilidad: " + g.nodes[2].probs());

        })
        .then(function (r) {
            return g.sample(100000); //likelihood weight sampling aka the inference
        })
        .then(function (r) {
            console.log('Segunda Iteracion de 100.000');

            //console.log(g);
            //console.log(JSON.stringify(g));
            console.log("Nombre: " + g.nodes[0].name + " - Valor: " + g.nodes[0].value + " - Probabilidad: " + g.nodes[0].probs());
            console.log("Nombre: " + g.nodes[1].name + " - Valor: " + g.nodes[1].value + " - Probabilidad: " + g.nodes[1].probs());
            console.log("Nombre: " + g.nodes[2].name + " - Valor: " + g.nodes[2].value + " - Probabilidad: " + g.nodes[2].probs());

        })
        .then(function (r) {
            return g.sample(1000000); //likelihood weight sampling aka the inference
        })
        .then(function (r) {
            console.log('Segunda Iteracion de 1.000.000');

            //console.log(g);
            //console.log(JSON.stringify(g));
            console.log("Nombre: " + g.nodes[0].name + " - Valor: " + g.nodes[0].value + " - Probabilidad: " + g.nodes[0].probs());
            console.log("Nombre: " + g.nodes[1].name + " - Valor: " + g.nodes[1].value + " - Probabilidad: " + g.nodes[1].probs());
            console.log("Nombre: " + g.nodes[2].name + " - Valor: " + g.nodes[2].value + " - Probabilidad: " + g.nodes[2].probs());

        })
        .then(function (r) {
            return g.sample(10000000); //likelihood weight sampling aka the inference
        })
        .then(function (r) {
            console.log('Segunda Iteracion de 10.000.000');

            //console.log(g);
            //console.log(JSON.stringify(g));
            console.log("Nombre: " + g.nodes[0].name + " - Valor: " + g.nodes[0].value + " - Probabilidad: " + g.nodes[0].probs());
            console.log("Nombre: " + g.nodes[1].name + " - Valor: " + g.nodes[1].value + " - Probabilidad: " + g.nodes[1].probs());
            console.log("Nombre: " + g.nodes[2].name + " - Valor: " + g.nodes[2].value + " - Probabilidad: " + g.nodes[2].probs());

        });
});
