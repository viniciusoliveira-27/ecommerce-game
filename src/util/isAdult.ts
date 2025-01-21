import { differenceInYears } from 'date-fns';

/**
 * Verifica se a pessoa é maior de 18 anos com base na data de nascimento.
 * @param dataNascimento - A data de nascimento do usuário.
 * @returns true se for maior ou igual a 18 anos, false caso contrário.
 */
export function isAdult(dataNascimento: Date): boolean {
    const idade = differenceInYears(new Date(), dataNascimento); // Calcula a idade em anos
    return idade >= 18; // Retorna true se idade >= 18, senão false
}