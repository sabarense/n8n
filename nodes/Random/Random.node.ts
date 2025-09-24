import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'random',
		icon: 'file:icon.node.svg',
		group: ['transform'],
		version: 1,
		description: 'True Random Number Generator using Random.org',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				required: true,
				description: 'Valor mínimo (inclusivo) para o número aleatório',
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 60,
				required: true,
				description: 'Valor máximo (inclusivo) para o número aleatório',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				
				const min = this.getNodeParameter('min', i) as number;
				const max = this.getNodeParameter('max', i) as number;
                
                if (min === undefined || max === undefined || min === null || max === null) {
                    throw new NodeOperationError(this.getNode(), 'Os parâmetros "Min" e "Max" são obrigatórios.', { itemIndex: i });
                }

                if (!Number.isInteger(min) || !Number.isInteger(max)) {
                    throw new NodeOperationError(this.getNode(), 'Os valores de "Min" e "Max" devem ser inteiros.', { itemIndex: i });
                }
				
				if (min >= max) {
					throw new NodeOperationError(
						this.getNode(),
						'O valor de "Max" deve ser estritamente maior que o valor de "Min".',
						{ itemIndex: i },
					);
				}

				const url = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url,
					json: false, 
				});

				const randomNumber = parseInt(response as string, 10);

				if (isNaN(randomNumber)) {
					throw new NodeOperationError(
						this.getNode(),
						`A API retornou uma resposta inválida. Resposta recebida: "${response}"`,
						{ itemIndex: i },
					);
				}

				const currentItem = items[i];
				currentItem.json.randomNumber = randomNumber;
				returnData.push(currentItem);

			} catch (error) {
				if (this.continueOnFail()) {

					items[i].json.error = (error as Error).message;
					returnData.push(items[i]);
					continue;
				}

				throw error;
			}
		}

		return this.prepareOutputData(returnData);
	}
}