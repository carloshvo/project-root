// backend/database/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const materiaisConstrucao = [
  // CIMENTOS E AGLOMERANTES (C001-C010)
  { codigo: 'C001', nome: 'Cimento CP-II 50kg', descricao: 'Cimento Portland Composto CP-II', categoria: 'Cimentos', unidade_medida: 'saco', quantidade: 250, minimo: 20 },
  { codigo: 'C002', nome: 'Cimento CP-IV 50kg', descricao: 'Cimento Portland Pozolânico', categoria: 'Cimentos', unidade_medida: 'saco', quantidade: 180, minimo: 15 },
  { codigo: 'C003', nome: 'Cimento Branco 50kg', descricao: 'Cimento Portland Branco Estrutural', categoria: 'Cimentos', unidade_medida: 'saco', quantidade: 120, minimo: 10 },
  { codigo: 'C004', nome: 'Cal Hidratada 20kg', descricao: 'Cal hidratada tipo CH-I', categoria: 'Cimentos', unidade_medida: 'saco', quantidade: 200, minimo: 15 },
  { codigo: 'C005', nome: 'Argamassa Pronta 20kg', descricao: 'Argamassa pronta para uso', categoria: 'Cimentos', unidade_medida: 'saco', quantidade: 150, minimo: 10 },
  { codigo: 'C006', nome: 'Gesso Puro 40kg', descricao: 'Gesso puro para revestimento', categoria: 'Cimentos', unidade_medida: 'saco', quantidade: 180, minimo: 15 },
  { codigo: 'C007', nome: 'Adesivo para Cerâmica 25kg', descricao: 'Adesivo cinzento para azulejos', categoria: 'Cimentos', unidade_medida: 'saco', quantidade: 140, minimo: 10 },
  { codigo: 'C008', nome: 'Rejunte Cinzento 5kg', descricao: 'Rejunte cinzento para cerâmica', categoria: 'Cimentos', unidade_medida: 'saco', quantidade: 200, minimo: 15 },
  { codigo: 'C009', nome: 'Rejunte Branco 5kg', descricao: 'Rejunte branco para azulejos', categoria: 'Cimentos', unidade_medida: 'saco', quantidade: 180, minimo: 15 },
  { codigo: 'C010', nome: 'Impermeabilizante Líquido 20L', descricao: 'Impermeabilizante acrílico', categoria: 'Cimentos', unidade_medida: 'litro', quantidade: 80, minimo: 5 },

  // TIJOLOS E BLOCOS (T001-T010)
  { codigo: 'T001', nome: 'Tijolo Cerâmico 9x19x29cm', descricao: 'Tijolo padrão cerâmico', categoria: 'Tijolos', unidade_medida: 'unidade', quantidade: 5000, minimo: 500 },
  { codigo: 'T002', nome: 'Tijolose 6 furos 14x19x29cm', descricao: 'Bloco de concreto 6 furos', categoria: 'Tijolos', unidade_medida: 'unidade', quantidade: 3000, minimo: 300 },
  { codigo: 'T003', nome: 'Bloco Estrutural 14x19x39cm', descricao: 'Bloco estrutural para carga', categoria: 'Tijolos', unidade_medida: 'unidade', quantidade: 2500, minimo: 250 },
  { codigo: 'T004', nome: 'Bloco de Vedação 9x19x39cm', descricao: 'Bloco para vedação interna', categoria: 'Tijolos', unidade_medida: 'unidade', quantidade: 2800, minimo: 280 },
  { codigo: 'T005', nome: 'Placa de Gesso 120x240cm 12mm', descricao: 'Placa de gesso acartonado', categoria: 'Tijolos', unidade_medida: 'unidade', quantidade: 450, minimo: 30 },
  { codigo: 'T006', nome: 'Bloco Termoacústico 14x19x39cm', descricao: 'Bloco com isolante térmico', categoria: 'Tijolos', unidade_medida: 'unidade', quantidade: 1200, minimo: 100 },
  { codigo: 'T007', nome: 'Placa Cimentícia 12x60x120cm', descricao: 'Placa cimentícia para fachada', categoria: 'Tijolos', unidade_medida: 'unidade', quantidade: 320, minimo: 20 },
  { codigo: 'T008', nome: 'Bloco Intertravado 20x10x6cm', descricao: 'Bloco intertravado para pavimentação', categoria: 'Tijolos', unidade_medida: 'unidade', quantidade: 8000, minimo: 800 },
  { codigo: 'T009', nome: 'Telha Cerâmica Francesa', descricao: 'Telha de barro tipo francesa', categoria: 'Tijolos', unidade_medida: 'unidade', quantidade: 1500, minimo: 150 },
  { codigo: 'T010', nome: 'Telha Francesa Capa/Canal', descricao: 'Telha francesa capa e canal', categoria: 'Tijolos', unidade_medida: 'unidade', quantidade: 2000, minimo: 200 },

  // AREIA E AGREGADOS (A001-A010)
  { codigo: 'A001', nome: 'Areia Média m³', descricao: 'Areia média para argamassa', categoria: 'Agregados', unidade_medida: 'm³', quantidade: 150, minimo: 15 },
  { codigo: 'A002', nome: 'Areia Fina m³', descricao: 'Areia fina para reboco', categoria: 'Agregados', unidade_medida: 'm³', quantidade: 100, minimo: 10 },
  { codigo: 'A003', nome: 'Brita 0 m³', descricao: 'Brita nº 0 para concreto', categoria: 'Agregados', unidade_medida: 'm³', quantidade: 120, minimo: 12 },
  { codigo: 'A004', nome: 'Brita 1 m³', descricao: 'Brita nº 1 para concreto', categoria: 'Agregados', unidade_medida: 'm³', quantidade: 200, minimo: 20 },
  { codigo: 'A005', nome: 'Brita 2 m³', descricao: 'Brita nº 2 para concreto', categoria: 'Agregados', unidade_medida: 'm³', quantidade: 180, minimo: 18 },
  { codigo: 'A006', nome: 'Pó de Pedra m³', descricao: 'Pó de pedra para base', categoria: 'Agregados', unidade_medida: 'm³', quantidade: 160, minimo: 16 },
  { codigo: 'A007', nome: 'Cascalho m³', descricao: 'Cascalho para aterro', categoria: 'Agregados', unidade_medida: 'm³', quantidade: 140, minimo: 14 },
  { codigo: 'A008', nome: 'Pedrisco m³', descricao: 'Pedrisco para acabamento', categoria: 'Agregados', unidade_medida: 'm³', quantidade: 110, minimo: 11 },
  { codigo: 'A009', nome: 'Areia Grossa m³', descricao: 'Areia grossa para concreto', categoria: 'Agregados', unidade_medida: 'm³', quantidade: 130, minimo: 13 },
  { codigo: 'A010', nome: 'Seixo Rolado m³', descricao: 'Seixo para decoração', categoria: 'Agregados', unidade_medida: 'm³', quantidade: 90, minimo: 9 },

  // TUBOS E CONEXÕES (TC001-TC010)
  { codigo: 'TC001', nome: 'Cano PVC 25mm (6m)', descricao: 'Tubo PVC rígido 25mm série K', categoria: 'Tubulações', unidade_medida: 'unidade', quantidade: 350, minimo: 30 },
  { codigo: 'TC002', nome: 'Cano PVC 32mm (6m)', descricao: 'Tubo PVC rígido 32mm série K', categoria: 'Tubulações', unidade_medida: 'unidade', quantidade: 300, minimo: 30 },
  { codigo: 'TC003', nome: 'Cano PVC 40mm (6m)', descricao: 'Tubo PVC rígido 40mm série K', categoria: 'Tubulações', unidade_medida: 'unidade', quantidade: 250, minimo: 25 },
  { codigo: 'TC004', nome: 'Cano PVC 50mm (6m)', descricao: 'Tubo PVC rígido 50mm série K', categoria: 'Tubulações', unidade_medida: 'unidade', quantidade: 180, minimo: 18 },
  { codigo: 'TC005', nome: 'Joelho 90° PVC 25mm', descricao: 'Conexão joelho 90 graus 25mm', categoria: 'Tubulações', unidade_medida: 'unidade', quantidade: 500, minimo: 40 },
  { codigo: 'TC006', nome: 'Joelho 90° PVC 32mm', descricao: 'Conexão joelho 90 graus 32mm', categoria: 'Tubulações', unidade_medida: 'unidade', quantidade: 450, minimo: 40 },
  { codigo: 'TC007', nome: 'Tê PVC 25mm', descricao: 'Conexão Tê 25mm', categoria: 'Tubulações', unidade_medida: 'unidade', quantidade: 400, minimo: 35 },
  { codigo: 'TC008', nome: 'Caixa de Passagem 60x60cm', descricao: 'Caixa para inspeção e passagem', categoria: 'Tubulações', unidade_medida: 'unidade', quantidade: 90, minimo: 8 },
  { codigo: 'TC009', nome: 'Sifão 1.5" Universal', descricao: 'Sifão para pia e lavatório', categoria: 'Tubulações', unidade_medida: 'unidade', quantidade: 200, minimo: 15 },
  { codigo: 'TC010', nome: 'Tubo Corrugado 25mm (50m)', descricao: 'Tubo corrugado para passagem de fios', categoria: 'Tubulações', unidade_medida: 'rolo', quantidade: 120, minimo: 10 },

  // VIDROS E ESPELHOS (V001-V010)
  { codigo: 'V001', nome: 'Vidro Comum 3mm m²', descricao: 'Vidro simples espessura 3mm', categoria: 'Vidros', unidade_medida: 'm²', quantidade: 450, minimo: 30 },
  { codigo: 'V002', nome: 'Vidro Temperado 6mm m²', descricao: 'Vidro temperado espessura 6mm', categoria: 'Vidros', unidade_medida: 'm²', quantidade: 280, minimo: 20 },
  { codigo: 'V003', nome: 'Vidro Espelhado 3mm m²', descricao: 'Espelho simples 3mm', categoria: 'Vidros', unidade_medida: 'm²', quantidade: 150, minimo: 10 },
  { codigo: 'V004', nome: 'Vidro Fumê 5mm m²', descricao: 'Vidro fumê espessura 5mm', categoria: 'Vidros', unidade_medida: 'm²', quantidade: 180, minimo: 12 },
  { codigo: 'V005', nome: 'Vidro Temperado 8mm m²', descricao: 'Vidro temperado espessura 8mm', categoria: 'Vidros', unidade_medida: 'm²', quantidade: 220, minimo: 15 },
  { codigo: 'V006', nome: 'Bloco de Vidro 20x20cm', descricao: 'Bloco de vidro para iluminação', categoria: 'Vidros', unidade_medida: 'unidade', quantidade: 600, minimo: 50 },
  { codigo: 'V007', nome: 'Moldura Alumínio para Vidro 6mm', descricao: 'Moldura De alumínio anodizado', categoria: 'Vidros', unidade_medida: 'metro', quantidade: 800, minimo: 50 },
  { codigo: 'V008', nome: 'Espuma Dupla Face 2mm', descricao: 'Fita dupla face para vidro', categoria: 'Vidros', unidade_medida: 'rolo', quantidade: 120, minimo: 10 },
  { codigo: 'V009', nome: 'Vidro Laminado 6mm m²', descricao: 'Vidro laminado segurança 6mm', categoria: 'Vidros', unidade_medida: 'm²', quantidade: 160, minimo: 12 },
  { codigo: 'V010', nome: 'Vidro Duplo Incolor', descricao: 'Vidro duplo para isolamento', categoria: 'Vidros', unidade_medida: 'm²', quantidade: 140, minimo: 10 },

  // PINTURAS E VERNIZES (P001-P010)
  { codigo: 'P001', nome: 'Tinta Acrílica Branca 18L', descricao: 'Tinta acrílica interna branca', categoria: 'Pinturas', unidade_medida: 'litro', quantidade: 250, minimo: 20 },
  { codigo: 'P002', nome: 'Tinta Acrílica Colorida 18L', descricao: 'Tinta acrílica em cores variadas', categoria: 'Pinturas', unidade_medida: 'litro', quantidade: 200, minimo: 15 },
  { codigo: 'P003', nome: 'Tinta Acrílica Impermeável 18L', descricao: 'Tinta acrílica com impermeabilizante', categoria: 'Pinturas', unidade_medida: 'litro', quantidade: 180, minimo: 15 },
  { codigo: 'P004', nome: 'Tinta Acrílica Acetinada 18L', descricao: 'Tinta acrílica acetinada para madeira', categoria: 'Pinturas', unidade_medida: 'litro', quantidade: 160, minimo: 12 },
  { codigo: 'P005', nome: 'Verniz Poliuretano 18L', descricao: 'Verniz poliuretano brilhante', categoria: 'Pinturas', unidade_medida: 'litro', quantidade: 140, minimo: 10 },
  { codigo: 'P006', nome: 'Verniz Acrílico 18L', descricao: 'Verniz acrílico a água', categoria: 'Pinturas', unidade_medida: 'litro', quantidade: 120, minimo: 10 },
  { codigo: 'P007', nome: 'Esmalte Sintético Branco 18L', descricao: 'Esmalte sintético para metal', categoria: 'Pinturas', unidade_medida: 'litro', quantidade: 130, minimo: 10 },
  { codigo: 'P008', nome: 'Pincel Nylon 1"', descricao: 'Pincel de nylon para tinta', categoria: 'Pinturas', unidade_medida: 'unidade', quantidade: 400, minimo: 30 },
  { codigo: 'P009', nome: 'Rolo de Espuma 20cm', descricao: 'Rolo de espuma para pintura lisa', categoria: 'Pinturas', unidade_medida: 'unidade', quantidade: 350, minimo: 25 },
  { codigo: 'P010', nome: 'Fita Crepe 50mm', descricao: 'Fita crepe para proteção em pintura', categoria: 'Pinturas', unidade_medida: 'unidade', quantidade: 500, minimo: 30 },

  // MADEIRA E COMPENSADO (M001-M010)
  { codigo: 'M001', nome: 'Madeira de Lei 2x4x400cm', descricao: 'Madeira de lei para estrutura', categoria: 'Madeira', unidade_medida: 'unidade', quantidade: 250, minimo: 20 },
  { codigo: 'M002', nome: 'Madeira de Lei 5x5x400cm', descricao: 'Viga de madeira de lei 5x5', categoria: 'Madeira', unidade_medida: 'unidade', quantidade: 180, minimo: 15 },
  { codigo: 'M003', nome: 'Compensado 1.25x2.5m 3mm', descricao: 'Chapa de compensado espessura 3mm', categoria: 'Madeira', unidade_medida: 'unidade', quantidade: 300, minimo: 25 },
  { codigo: 'M004', nome: 'Compensado 1.25x2.5m 12mm', descricao: 'Chapa de compensado espessura 12mm', categoria: 'Madeira', unidade_medida: 'unidade', quantidade: 220, minimo: 15 },
  { codigo: 'M005', nome: 'MDF 1.25x2.5m 15mm', descricao: 'Placa de MDF espessura 15mm', categoria: 'Madeira', unidade_medida: 'unidade', quantidade: 280, minimo: 20 },
  { codigo: 'M006', nome: 'MDF 1.25x2.5m 18mm', descricao: 'Placa de MDF espessura 18mm', categoria: 'Madeira', unidade_medida: 'unidade', quantidade: 250, minimo: 18 },
  { codigo: 'M007', nome: 'Madeira Pinus 2x4x400cm', descricao: 'Madeira de pinus para estrutura', categoria: 'Madeira', unidade_medida: 'unidade', quantidade: 400, minimo: 35 },
  { codigo: 'M008', nome: 'Sarrafo 2x2x400cm', descricao: 'Sarrafo para estrutura leve', categoria: 'Madeira', unidade_medida: 'unidade', quantidade: 600, minimo: 50 },
  { codigo: 'M009', nome: 'Prateleira de Madeira 60x30cm', descricao: 'Prateleira pronta para uso', categoria: 'Madeira', unidade_medida: 'unidade', quantidade: 180, minimo: 15 },
  { codigo: 'M010', nome: 'Porta Madeira 70x210m', descricao: 'Porta de madeira maciça', categoria: 'Madeira', unidade_medida: 'unidade', quantidade: 120, minimo: 8 },

  // PISOS E REVESTIMENTOS (PR001-PR010)
  { codigo: 'PR001', nome: 'Cerâmica 30x30cm Branca', descricao: 'Azulejo cerâmico 30x30 branco', categoria: 'Revestimentos', unidade_medida: 'm²', quantidade: 500, minimo: 40 },
  { codigo: 'PR002', nome: 'Cerâmica 30x30cm Cinza', descricao: 'Azulejo cerâmico 30x30 cinzento', categoria: 'Revestimentos', unidade_medida: 'm²', quantidade: 450, minimo: 35 },
  { codigo: 'PR003', nome: 'Porcelanato 60x60cm', descricao: 'Porcelanato polido 60x60cm', categoria: 'Revestimentos', unidade_medida: 'm²', quantidade: 380, minimo: 30 },
  { codigo: 'PR004', nome: 'Porcelanato 60x120cm Marmore', descricao: 'Porcelanato imitação mármore', categoria: 'Revestimentos', unidade_medida: 'm²', quantidade: 320, minimo: 25 },
  { codigo: 'PR005', nome: 'Granito 60x60cm', descricao: 'Grés 60x60 para piso', categoria: 'Revestimentos', unidade_medida: 'm²', quantidade: 280, minimo: 20 },
  { codigo: 'PR006', nome: 'Laminado Wood 1,5x0,5m', descricao: 'Piso laminado cor madeira', categoria: 'Revestimentos', unidade_medida: 'm²', quantidade: 350, minimo: 25 },
  { codigo: 'PR007', nome: 'Vinílico Autoadesivo 1m', descricao: 'Piso vinílico com adesivo', categoria: 'Revestimentos', unidade_medida: 'm²', quantidade: 400, minimo: 30 },
  { codigo: 'PR008', nome: 'Manta Acústica 10mm', descricao: 'Manta acústica para piso', categoria: 'Revestimentos', unidade_medida: 'm²', quantidade: 200, minimo: 15 },
  { codigo: 'PR009', nome: 'Rodapé Madeira 10cm', descricao: 'Rodapé de madeira 10cm altura', categoria: 'Revestimentos', unidade_medida: 'metro', quantidade: 800, minimo: 60 },
  { codigo: 'PR010', nome: 'Moldura Gesso 10cm', descricao: 'Moldura de gesso para parede', categoria: 'Revestimentos', unidade_medida: 'metro', quantidade: 600, minimo: 50 },

  // FERRAGENS E PARAFUSOS (F001-F010)
  { codigo: 'F001', nome: 'Parafuso Zinco 3x20mm 1kg', descricao: 'Parafuso zincado para madeira', categoria: 'Ferragens', unidade_medida: 'kg', quantidade: 200, minimo: 15 },
  { codigo: 'F002', nome: 'Parafuso Zinco 3.5x30mm 1kg', descricao: 'Parafuso zincado 3.5 30mm', categoria: 'Ferragens', unidade_medida: 'kg', quantidade: 180, minimo: 12 },
  { codigo: 'F003', nome: 'Prego 2.5cm 1kg', descricao: 'Prego 25mm comum', categoria: 'Ferragens', unidade_medida: 'kg', quantidade: 250, minimo: 20 },
  { codigo: 'F004', nome: 'Prego 3.8cm 1kg', descricao: 'Prego 38mm comum', categoria: 'Ferragens', unidade_medida: 'kg', quantidade: 220, minimo: 15 },
  { codigo: 'F005', nome: 'Bucha Plástica N° 6', descricao: 'Bucha de plástico nº6', categoria: 'Ferragens', unidade_medida: 'unidade', quantidade: 1000, minimo: 80 },
  { codigo: 'F006', nome: 'Bucha Plástica N° 8', descricao: 'Bucha de plástico nº8', categoria: 'Ferragens', unidade_medida: 'unidade', quantidade: 900, minimo: 70 },
  { codigo: 'F007', nome: 'Tarugo de Madeira Ø9x45mm', descricao: 'Tarugo para pendurador', categoria: 'Ferragens', unidade_medida: 'unidade', quantidade: 500, minimo: 40 },
  { codigo: 'F008', nome: 'Dobradiça Tradicional 3x2.5"', descricao: 'Dobradiça latão para porta', categoria: 'Ferragens', unidade_medida: 'unidade', quantidade: 300, minimo: 20 },
  { codigo: 'F009', nome: 'Fechadura Cilindro', descricao: 'Fechadura de cilindro para porta', categoria: 'Ferragens', unidade_medida: 'unidade', quantidade: 150, minimo: 10 },
  { codigo: 'F010', nome: 'Corrente Ferro 6mm', descricao: 'Corrente de ferro galvanizado', categoria: 'Ferragens', unidade_medida: 'metro', quantidade: 400, minimo: 30 },

  // ACABAMENTOS E DIVERSOS (AC001-AC010)
  { codigo: 'AC001', nome: 'Fita Dupla Face 12mm', descricao: 'Fita dupla face espessura 12mm', categoria: 'Acabamentos', unidade_medida: 'rolo', quantidade: 300, minimo: 20 },
  { codigo: 'AC002', nome: 'Fita Isolante Branca', descricao: 'Fita isolante para fios', categoria: 'Acabamentos', unidade_medida: 'rolo', quantidade: 400, minimo: 30 },
  { codigo: 'AC003', nome: 'Silicone Branco 280ml', descricao: 'Silicone acrílico branco', categoria: 'Acabamentos', unidade_medida: 'unidade', quantidade: 250, minimo: 15 },
  { codigo: 'AC004', nome: 'Silicone Cinza 280ml', descricao: 'Silicone acrílico cinzento', categoria: 'Acabamentos', unidade_medida: 'unidade', quantidade: 200, minimo: 12 },
  { codigo: 'AC005', nome: 'Rodapé PVC Branco 1m', descricao: 'Rodapé de PVC branco', categoria: 'Acabamentos', unidade_medida: 'unidade', quantidade: 350, minimo: 25 },
  { codigo: 'AC006', nome: 'Esquadria Alumínio 1"x1"', descricao: 'Perfil de alumínio para estrutura', categoria: 'Acabamentos', unidade_medida: 'metro', quantidade: 500, minimo: 40 },
  { codigo: 'AC007', nome: 'Batente Madeira 7x23cm', descricao: 'Batente para portas tipo especial', categoria: 'Acabamentos', unidade_medida: 'metro', quantidade: 280, minimo: 20 },
  { codigo: 'AC008', nome: 'Eletroduto 20mm (3m)', descricao: 'Eletroduto para passagem de fios', categoria: 'Acabamentos', unidade_medida: 'unidade', quantidade: 200, minimo: 15 },
  { codigo: 'AC009', nome: 'Tomada Simples 10A', descricao: 'Tomada simples branca', categoria: 'Acabamentos', unidade_medida: 'unidade', quantidade: 600, minimo: 50 },
  { codigo: 'AC010', nome: 'Interruptor Simples 10A', descricao: 'Interruptor simples branco', categoria: 'Acabamentos', unidade_medida: 'unidade', quantidade: 500, minimo: 40 },
];

async function main() {
  // Usuário administrador inicial
  const senhaHash = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@empresa.com' },
    update: {},
    create: {
      nome: 'Administrador',
      email: 'admin@empresa.com',
      senha: senhaHash,
      perfil: 'admin',
    },
  });

  // Inserir 100 materiais
  for (const material of materiaisConstrucao) {
    await prisma.material.upsert({
      where: { codigo: material.codigo },
      update: {},
      create: {
        codigo: material.codigo,
        nome: material.nome,
        descricao: material.descricao,
        categoria: material.categoria,
        unidade_medida: material.unidade_medida,
        quantidade_estoque: material.quantidade,
        estoque_minimo: material.minimo,
      },
    });
  }

  console.log('✅ Seed completed successfully! 100 materials created.');
}

main()
  .then(() => {
    console.log('Seed executado com sucesso.');
  })
  .catch((e) => {
    console.error('Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });