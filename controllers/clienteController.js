var clientes = [
    {
        id: 1,
        nome: 'Ana Souza',
        idade: 28,
        cidade: 'Sorocaba',
        pedidos: [
            { codigo: 101, produto: 'Notebook', quantidade: 1 },
            { codigo: 102, produto: 'Mouse', quantidade: 2 }
        ]
    },
    {
        id: 2,
        nome: 'Bruno Lima',
        idade: 35,
        cidade: 'Campinas',
        pedidos: [
            { codigo: 103, produto: 'Teclado', quantidade: 1 }
        ]
    },
    {
        id: 3,
        nome: 'Carla Mendes',
        idade: 22,
        cidade: 'Sorocaba',
        pedidos: []
    }
];

exports.listarClientes = (req, res) => {
    res.json(clientes);
};

exports.obterClientePorId = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ mensagem: 'Id não existente' });
    }
};

exports.listarPedidos = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    if (cliente) {
        res.json(cliente.pedidos);
    } else {
        res.status(404).json({ mensagem: 'Id não existente' });
    }
};

exports.listarPorCidade = (req, res) => {
    const cidade = req.params.cidade.toLowerCase();
    const clientesCidade = clientes.filter(c => c.cidade.toLowerCase() === cidade);
    res.json(clientesCidade);
};

exports.atualizar = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) {
        return res.status(404).json({ mensagem: 'Id não existente' });
    }
    const { nome, idade, cidade } = req.body;
    cliente.nome = nome || cliente.nome;
    cliente.idade = idade || cliente.idade;
    cliente.cidade = cidade || cliente.cidade;
    res.json({ mensagem: 'Cliente atualizado com sucesso', cliente: cliente });
};

exports.adicionarPedido = (req, res) => {
    const id = parseInt(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) {
        return res.status(404).json({ mensagem: 'Id não existente' });
    }
    const { codigo, produto, quantidade } = req.body;
    if (!codigo || !produto || !quantidade) {
        return res.status(400).json({ mensagem: 'Informe codigo, produto e quantidade' });
    }
    const pedido = { codigo, produto, quantidade };
    cliente.pedidos.push(pedido);
    res.status(201).json({ mensagem: 'Pedido adicionado com sucesso', cliente: cliente });
};

exports.remover = (req, res) => {
    const id = parseInt(req.params.id);
    const indice = clientes.findIndex(c => c.id === id);
    if (indice === -1) {
        return res.status(404).json({ mensagem: 'Id não existente' });
    }
    clientes.splice(indice, 1);
    res.json({ mensagem: 'Cliente removido com sucesso' });
};