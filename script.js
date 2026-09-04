CREATE DATABASE decoramor;

USE decoramor;

CREATE TABLE avaliacoes (
    id_avaliacao INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    comentario TEXT NOT NULL,
    nota INT NOT NULL,
    data_avaliacao DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO avaliacoes (nome, comentario, nota)
VALUES
('Maria Silva', 'Adorei o atendimento e a decoração!', 5),
('João Santos', 'Ambiente muito bonito e atendimento excelente.', 5),
('Ana Oliveira', 'Gostei muito do resultado.', 4);

SELECT * FROM avaliacoes;

SELECT
    nome,
    comentario,
    nota,
    data_avaliacao
FROM avaliacoes
ORDER BY data_avaliacao DESC;

SELECT
    ROUND(AVG(nota), 1) AS media_avaliacoes
FROM avaliacoes;
