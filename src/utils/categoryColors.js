// Kategori adına göre renk
export function color(category) {
  switch (category) {
    case 'Main expenses':
      return '#FED057';
    case 'Products':
      return '#FFD8D0';
    case 'Car':
      return '#FD9498';
    case 'Self care':
      return '#C5BAFF';
    case 'Child care':
      return '#6E78E8';
    case 'Household products':
      return '#4A56E2';
    case 'Education':
      return '#81E1FF';
    case 'Leisure':
      return '#24CCA7';
    case 'Other expenses':
      return '#00AD84';
    case 'Entertainment':
      return '#e20a5dff';
    default:
      return '#888888';
  }
}
