package sinan;

public class SinanEncode {
	//Chave de Criptografia
	static final String SinanEncode_Key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	//Quantidade de Caracteres da Chave de Criptografia
	static final int SinanEncode_Key_Length = 62;
	static char[] SinanEncode_Key_Array = SinanEncode_Key.toCharArray();

	private static char GetCaracterOfKey(int index)
	//Criptografar um caractere, substituindo o caractere original por qualquer outro da Chave de Criptografia,
	//decrementando ou incrementado o indice de acordo com a quantidade de caracteres da Chave de Criptografia.
	{
		while (index >= SinanEncode_Key_Length)
		{
			index = index - SinanEncode_Key_Length;
		}

		while (index < 0)
		{
			index = index + SinanEncode_Key_Length;
		}

		return SinanEncode_Key_Array[index];
	}

	private static int GetIndexOfKey(char caracter)
	//Localizar a posicao do caractere na Chave de Criptografia, senao encontrar retorna
	{
		return SinanEncode_Key.indexOf(caracter);
	}

	public static String Encrypt(String text, boolean flag)
	//Se encontrar o caractere do TEXTO na CHAVE de criptografia, substitua esse caractere por um novo caractere da CHAVE de crip
	// Indice do novo caractere e igual a posicao do caractere do TEXTO a ser criptografado na CHAVE de criptografia MAIS a posicaracteres do TEXTO
	// Se o indice do novo caractere for maior que a quantidade de caracteres da CHAVE, decremente o mesmo e se for menor que 1, incremente o mesmo
	//Se nao encontrar, mantenha o caractere original.
	//Obs: Para descriptografar, inverter o calculo, MAIS passa a ser MENOS
	{
		int _x;
		char[] _input = text.toCharArray();
		int _inputL = _input.length;	//Calcular a quantidade de caracteres do texto original
		char[] _output = _input;

		for (int _i = 0; _i < _inputL; _i++)
		{
			_x = GetIndexOfKey(_input[_i]);
			if (_x >= 0)
			{
				if (flag)
				{
					_output[_i] = GetCaracterOfKey(_x + _i + _inputL + 1);
				}
				else
				{
					_output[_i] = GetCaracterOfKey(_x - _i - _inputL - 1);
				}
			}
			else
			{
				_output[_i] = _input[_i];
			}
		}
		return String.valueOf(_output);
	}
}
