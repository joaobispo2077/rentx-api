Use cases

# Cadastro de Carros

**Requisitos Funcionais**

- Deve ser possivel cadastrar carros.
- Deve ser possível listar todas as categorias.

**Regras de negócio**

- Não deve ser possível cadastrar um carro com uma placa já existente.
- O carro deve ser cadastrado por padrão com disponibilidade livre.
- Apenas usuários administradores devem criar carros.

# Listagem de carros

**Requisitos Funcionais**

- Deve ser possível listar os carros.
- Deve ser possível filtrar os carros por categoria.
- Deve ser possível filtrar os carros pela marca.

**Regras de negócio**

- Deve ser possível listar apenas os carros disponíveis.
- O usuário não necessitar estar autenticado para listar os carros.

# Cadastro de especificação no carro

**Requisitos Funcionais**

- Deve ser possível cadastrar uma especificação para um carro.

**Regras de negócio**

- Não deve ser possível cadastrar uma especificação para um carro que não existe.
- Não deve ser possível cadastrar uma especificação para um carro que já possui a mesma especificação cadastrada.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastrar de imagens do carro

**Requisitos Funcionais**

- Deve ser possível cadastrar imagens para um mesmo carro.

**Requisitos não funcionais**

- Utilizar o multer para upload dos arquivos.
- Deve ser possível listar **todos** os carros.

**Regras de negócio**

- O usuario deve poder cadastrar mais de uma imagem para o mesmo carro.
- O usuário responsável pelo cadastro deve ser um usuário administrador.

# Aluguel de carro

**Requisitos Funcionais**

- Deve ser possível listar os carros.
- Deve ser possível cadastrar um aluguel.

**Regras de negócio**

- O aluguel deve ter duração mínima de 1 dia (24hrs).
- Não deve ser possível alugar um carro que não está disponível.
- Não deve ser possível alugar um carro, caso o usuário já tenha outro aluguel em aberto.
- Ao realizar um aluguel o status do carro deve ser alteado para indisponível.

# Devolução de carro

**Requisitos Funcionais**

- Deve seer possível realizar a devolução de um carro.

**Regras de negócio**

- Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
- Ao realizar a devolução, o carro deverá ser disponibilizado para novos alugueis.
- Ao realizar a devolução o usuário deverá ser liberado para outro aluguel.
- AO realizar devolução, deverá ser calculado o total do aluguel.
- Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
- Caso haja multa, deverá ser somado ao total do aluguel.
