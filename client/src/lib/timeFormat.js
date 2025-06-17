
const timeFormat = (minut) => {
    const hours = Math.floor(minut / 60);
    const remMinut = minut % 60;
    return `${hours}h ${remMinut}m`
}

export default timeFormat