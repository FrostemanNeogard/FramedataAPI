import { BadRequestException, Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CharacterCodeService {
  private readonly logger = new Logger();

  private readonly characterCodes = {
    akuma: 'akuma',
    alisa: 'alisa',
    anna: 'anna',
    armor_king: 'armor-king',
    asuka: 'asuka',
    bob: 'bob',
    bryan: 'bryan',
    claudio: 'claudio',
    devil_jin: 'devil-jin',
    dragunov: 'dragunov',
    eddy: 'eddy',
    eliza: 'eliza',
    fahkumram: 'fahkumram',
    feng: 'feng',
    ganryu: 'ganryu',
    geese: 'geese',
    gigas: 'gigas',
    heihachi: 'heihachi',
    hwoarang: 'hwoarang',
    jack_7: 'jack7',
    jin: 'jin',
    josie: 'josie',
    julia: 'julia',
    katarina: 'katarina',
    kazumi: 'kazumi',
    kazuya: 'kazuya',
    king: 'king',
    kuma: 'kuma',
    panda: 'kuma',
    kunimitsu: 'kunimitsu',
    lars: 'lars',
    law: 'law',
    lee: 'lee',
    lei: 'lei',
    leo: 'leo',
    leroy: 'leroy',
    lidia: 'lidia',
    lili: 'lili',
    lucky_chloe: 'lucky-chloe',
    marduk: 'marduk',
    master_raven: 'master-raven',
    miguel: 'miguel',
    negan: 'negan',
    nina: 'nina',
    noctis: 'noctis',
    paul: 'paul',
    shaheen: 'shaheen',
    steve: 'steve',
    xiaoyu: 'xiaoyu',
    yoshimitsu: 'yoshimitsu',
    zafina: 'zafina',

    victor: 'victor',
    reina: 'reina',
    raven: 'raven',
    azucena: 'azucena',
    jack_8: 'jack8',
    jun: 'jun',
  };

  private createAliasMap(aliases, code) {
    return aliases.reduce((map, alias) => {
      map[alias] = code;
      return map;
    }, {});
  }

  private generateCharacterMap() {
    const characterMap = {
      ...this.createAliasMap(
        ['akuma', 'gouki', 'aku'],
        this.characterCodes.akuma,
      ),
      ...this.createAliasMap(
        ['alisa', 'alis', 'als', 'alisa bosconovitch', 'bosconovitch'],
        this.characterCodes.alisa,
      ),
      ...this.createAliasMap(
        ['anna', 'ann', 'anna williams', 'williams2', 'williams 2'],
        this.characterCodes.anna,
      ),
      ...this.createAliasMap(
        ['armorking', 'armor-king', 'armor_king', 'ak', 'amk', 'armor king'],
        this.characterCodes.armor_king,
      ),
      ...this.createAliasMap(
        ['asuka', 'asuka kazama'],
        this.characterCodes.asuka,
      ),
      ...this.createAliasMap(
        ['bob', 'richards', 'bob richards', 'robert'],
        this.characterCodes.bob,
      ),
      ...this.createAliasMap(
        ['bryan', 'bry', 'brain', 'brian', 'fury', 'bryan fury'],
        this.characterCodes.bryan,
      ),
      ...this.createAliasMap(
        ['claudio', 'cla', 'serafino', 'claudio serafino'],
        this.characterCodes.claudio,
      ),
      ...this.createAliasMap(
        [
          'devil-jin',
          'devil_jin',
          'deviljin',
          'devil',
          'dj',
          'devil jin',
          'd jin',
          'dvj',
        ],
        this.characterCodes.devil_jin,
      ),
      ...this.createAliasMap(
        ['dragunov', 'drag', 'dra', 'sergei', 'sergei dragunov'],
        this.characterCodes.dragunov,
      ),
      ...this.createAliasMap(
        ['eddy', 'eddie', 'edy', 'edd', 'eddy gordo'],
        this.characterCodes.eddy,
      ),
      ...this.createAliasMap(
        ['eliza', 'liz', 'elisa', 'liza', 'elz'],
        this.characterCodes.eliza,
      ),
      ...this.createAliasMap(
        ['fahkumram', 'fahk', 'fak', 'fhk'],
        this.characterCodes.fahkumram,
      ),
      ...this.createAliasMap(
        ['feng', 'fng', 'wei', 'feng wei'],
        this.characterCodes.feng,
      ),
      ...this.createAliasMap(
        ['ganryu', 'gan', 'gry', 'ganny'],
        this.characterCodes.ganryu,
      ),
      ...this.createAliasMap(
        ['geese', 'howard', 'geese howard'],
        this.characterCodes.geese,
      ),
      ...this.createAliasMap(['gigas', 'gigass'], this.characterCodes.gigas),
      ...this.createAliasMap(
        ['heihachi', 'hei', 'hei mishima', 'heihachi mishima'],
        this.characterCodes.heihachi,
      ),
      ...this.createAliasMap(['hwoarang', 'hwo'], this.characterCodes.hwoarang),
      ...this.createAliasMap(
        ['jack7', 'jack_7', 'jack-7', 'jack 7'],
        this.characterCodes.jack_7,
      ),
      ...this.createAliasMap(['jin', 'jin kazama'], this.characterCodes.jin),
      ...this.createAliasMap(
        ['josie', 'crybaby', 'josie rizal', 'rizal'],
        this.characterCodes.josie,
      ),
      ...this.createAliasMap(
        ['julia', 'chang', 'jul', 'julia chang'],
        this.characterCodes.julia,
      ),
      ...this.createAliasMap(
        ['katarina', 'kat', 'alvez', 'katarina alvez', 'kat alvez'],
        this.characterCodes.katarina,
      ),
      ...this.createAliasMap(
        ['kazumi', 'kzm', 'kazumi mishima'],
        this.characterCodes.kazumi,
      ),
      ...this.createAliasMap(
        ['kazuya', 'kaz', 'kaz mishima', 'kazuya mishima'],
        this.characterCodes.kazuya,
      ),
      ...this.createAliasMap(['king'], this.characterCodes.king),
      ...this.createAliasMap(
        ['kuma', 'panda', 'bear', 'bears'],
        this.characterCodes.kuma,
      ),
      ...this.createAliasMap(
        ['kunimitsu', 'kuni'],
        this.characterCodes.kunimitsu,
      ),
      ...this.createAliasMap(
        ['lars', 'alexandersson', 'lars alexandersson'],
        this.characterCodes.lars,
      ),
      ...this.createAliasMap(
        ['law', 'bruce_lee', 'bruce-lee', 'marshall', 'marshall law'],
        this.characterCodes.law,
      ),
      ...this.createAliasMap(
        [
          'lee',
          'flower',
          'chaolan',
          'lee chaolan',
          'chaobla',
          'top 4',
          'lei chaobla',
        ],
        this.characterCodes.lee,
      ),
      ...this.createAliasMap(
        ['lei', 'jackie_chan', 'jackie-chan', 'wulong', 'lei wulong'],
        this.characterCodes.lei,
      ),
      ...this.createAliasMap(
        ['leo', 'kliesen', 'leo kliesen'],
        this.characterCodes.leo,
      ),
      ...this.createAliasMap(
        ['leroy', 'leroy smith'],
        this.characterCodes.leroy,
      ),
      ...this.createAliasMap(
        ['lidia', 'sobieska', 'lidia sobieska'],
        this.characterCodes.lidia,
      ),
      ...this.createAliasMap(
        ['lili', 'rochefort', 'lili de rochefort', 'lili rochefort'],
        this.characterCodes.lili,
      ),
      ...this.createAliasMap(
        [
          'luckychloe',
          'lucky-chloe',
          'lucky_chloe',
          'chloe',
          'lucky',
          'idol',
          'lucky chole',
          'l chloe',
        ],
        this.characterCodes.lucky_chloe,
      ),
      ...this.createAliasMap(
        ['marduk', 'duk', 'craig', 'craig marduk'],
        this.characterCodes.marduk,
      ),
      ...this.createAliasMap(
        ['masterraven', 'master-raven', 'maven', 'raven', 'master raven'],
        this.characterCodes.master_raven,
      ),
      ...this.createAliasMap(
        [
          'miguel',
          'mig',
          'caballero',
          'rojo',
          'miguel caballero',
          'miguel caballero rojo',
          'caballero rojo',
        ],
        this.characterCodes.miguel,
      ),
      ...this.createAliasMap(
        ['negan', 'negan smith'],
        this.characterCodes.negan,
      ),
      ...this.createAliasMap(
        ['nina', 'nina williams', 'williams1', 'williams 1'],
        this.characterCodes.nina,
      ),
      ...this.createAliasMap(
        [
          'noctis',
          'lucis',
          'caelum',
          'lucis caelum',
          'noctis caelum',
          'noctis lucis',
          'noctis lucis caelum',
          'calcium',
          'noctis calcium',
        ],
        this.characterCodes.noctis,
      ),
      ...this.createAliasMap(
        ['paul', 'phoenix', 'paul phoenix'],
        this.characterCodes.paul,
      ),
      ...this.createAliasMap(['shaheen', 'sha'], this.characterCodes.shaheen),
      ...this.createAliasMap(
        ['steve', 'boxer', 'steve fox', 'fox'],
        this.characterCodes.steve,
      ),
      ...this.createAliasMap(
        ['xioayu', 'ling', 'x', 'ling xiaoyu'],
        this.characterCodes.xiaoyu,
      ),
      ...this.createAliasMap(
        ['yoshi', 'yosh', 'yos', 'yoshimitsu'],
        this.characterCodes.yoshimitsu,
      ),
      ...this.createAliasMap(['zafina', 'zaf'], this.characterCodes.zafina),
      ...this.createAliasMap(['victor', 'vic'], this.characterCodes.victor),
      ...this.createAliasMap(['reina', 'rei'], this.characterCodes.reina),
      ...this.createAliasMap(['raven', 'rav'], this.characterCodes.raven),
      ...this.createAliasMap(['azucena', 'azu'], this.characterCodes.azucena),
      ...this.createAliasMap(
        ['jack 8', 'jack8', 'jack-8', 'jack_8'],
        this.characterCodes.jack_8,
      ),
      ...this.createAliasMap(['jun'], this.characterCodes.jun),
    };
    return characterMap;
  }

  private characterMap = {
    akuma: 'akuma',
    gouki: 'akuma',
    aku: 'akuma',
    alisa: 'alisa',
    alis: 'alisa',
    als: 'alisa',
    'alisa bosconovitch': 'alisa',
    bosconovitch: 'alisa',
    anna: 'anna',
    ann: 'anna',
    'anna williams': 'anna',
    williams2: 'anna',
    'williams 2': 'anna',
    armorking: 'armor-king',
    'armor-king': 'armor-king',
    armor_king: 'armor-king',
    ak: 'armor-king',
    amk: 'armor-king',
    'armor king': 'armor-king',
    asuka: 'asuka',
    'asuka kazama': 'asuka',
    bob: 'bob',
    richards: 'bob',
    'bob richards': 'bob',
    robert: 'bob',
    bryan: 'bryan',
    bry: 'bryan',
    brain: 'bryan',
    brian: 'bryan',
    fury: 'bryan',
    'bryan fury': 'bryan',
    claudio: 'claudio',
    cla: 'claudio',
    serafino: 'claudio',
    'claudio serafino': 'claudio',
    'devil-jin': 'devil-jin',
    devil_jin: 'devil-jin',
    deviljin: 'devil-jin',
    devil: 'devil-jin',
    dj: 'devil-jin',
    'devil jin': 'devil-jin',
    'd jin': 'devil-jin',
    dvj: 'devil-jin',
    dragunov: 'dragunov',
    drag: 'dragunov',
    dra: 'dragunov',
    sergei: 'dragunov',
    'sergei dragunov': 'dragunov',
    eddy: 'eddy',
    eddie: 'eddy',
    edy: 'eddy',
    edd: 'eddy',
    'eddy gordo': 'eddy',
    eliza: 'eliza',
    liz: 'eliza',
    elisa: 'eliza',
    liza: 'eliza',
    elz: 'eliza',
    fahkumram: 'fahkumram',
    fahk: 'fahkumram',
    fak: 'fahkumram',
    fhk: 'fahkumram',
    feng: 'feng',
    fng: 'feng',
    wei: 'feng',
    'feng wei': 'feng',
    ganryu: 'ganryu',
    gan: 'ganryu',
    gry: 'ganryu',
    ganny: 'ganryu',
    geese: 'geese',
    howard: 'geese',
    'geese howard': 'geese',
    gigas: 'gigas',
    gigass: 'gigas',
    heihachi: 'heihachi',
    hei: 'heihachi',
    'hei mishima': 'heihachi',
    'heihachi mishima': 'heihachi',
    hwoarang: 'hwoarang',
    hwo: 'hwoarang',
    jack7: 'jack7',
    jack_7: 'jack7',
    'jack-7': 'jack7',
    'jack 7': 'jack7',
    jin: 'jin',
    'jin kazama': 'jin',
    josie: 'josie',
    crybaby: 'josie',
    'josie rizal': 'josie',
    rizal: 'josie',
    julia: 'julia',
    chang: 'julia',
    jul: 'julia',
    'julia chang': 'julia',
    katarina: 'katarina',
    kat: 'katarina',
    alvez: 'katarina',
    'katarina alvez': 'katarina',
    'kat alvez': 'katarina',
    kazumi: 'kazumi',
    kzm: 'kazumi',
    'kazumi mishima': 'kazumi',
    kazuya: 'kazuya',
    kaz: 'kazuya',
    'kaz mishima': 'kazuya',
    'kazuya mishima': 'kazuya',
    king: 'king',
    kuma: 'kuma',
    panda: 'kuma',
    bear: 'kuma',
    bears: 'kuma',
    kunimitsu: 'kunimitsu',
    kuni: 'kunimitsu',
    lars: 'lars',
    alexandersson: 'lars',
    'lars alexandersson': 'lars',
    law: 'law',
    bruce_lee: 'law',
    'bruce-lee': 'law',
    marshall: 'law',
    'marshall law': 'law',
    lee: 'lee',
    flower: 'lee',
    chaolan: 'lee',
    'lee chaolan': 'lee',
    chaobla: 'lee',
    'top 4': 'lee',
    'lei chaobla': 'lee',
    lei: 'lei',
    jackie_chan: 'lei',
    'jackie-chan': 'lei',
    wulong: 'lei',
    'lei wulong': 'lei',
    leo: 'leo',
    kliesen: 'leo',
    'leo kliesen': 'leo',
    leroy: 'leroy',
    'leroy smith': 'leroy',
    lidia: 'lidia',
    sobieska: 'lidia',
    'lidia sobieska': 'lidia',
    lili: 'lili',
    rochefort: 'lili',
    'lili de rochefort': 'lili',
    'lili rochefort': 'lili',
    luckychloe: 'lucky-chloe',
    'lucky-chloe': 'lucky-chloe',
    lucky_chloe: 'lucky-chloe',
    chloe: 'lucky-chloe',
    lucky: 'lucky-chloe',
    idol: 'lucky-chloe',
    'lucky chole': 'lucky-chloe',
    'l chloe': 'lucky-chloe',
    marduk: 'marduk',
    duk: 'marduk',
    craig: 'marduk',
    'craig marduk': 'marduk',
    masterraven: 'master-raven',
    'master-raven': 'master-raven',
    maven: 'master-raven',
    raven: 'raven',
    'master raven': 'master-raven',
    miguel: 'miguel',
    mig: 'miguel',
    caballero: 'miguel',
    rojo: 'miguel',
    'miguel caballero': 'miguel',
    'miguel caballero rojo': 'miguel',
    'caballero rojo': 'miguel',
    negan: 'negan',
    'negan smith': 'negan',
    nina: 'nina',
    'nina williams': 'nina',
    williams1: 'nina',
    'williams 1': 'nina',
    noctis: 'noctis',
    lucis: 'noctis',
    caelum: 'noctis',
    'lucis caelum': 'noctis',
    'noctis caelum': 'noctis',
    'noctis lucis': 'noctis',
    'noctis lucis caelum': 'noctis',
    calcium: 'noctis',
    'noctis calcium': 'noctis',
    paul: 'paul',
    phoenix: 'paul',
    'paul phoenix': 'paul',
    shaheen: 'shaheen',
    sha: 'shaheen',
    steve: 'steve',
    boxer: 'steve',
    'steve fox': 'steve',
    fox: 'steve',
    xioayu: 'xiaoyu',
    ling: 'xiaoyu',
    x: 'xiaoyu',
    'ling xiaoyu': 'xiaoyu',
    yoshi: 'yoshimitsu',
    yosh: 'yoshimitsu',
    yos: 'yoshimitsu',
    yoshimitsu: 'yoshimitsu',
    zafina: 'zafina',
    zaf: 'zafina',
    victor: 'victor',
    vic: 'victor',
    reina: 'reina',
    rei: 'reina',
    rav: 'raven',
    azucena: 'azucena',
    azu: 'azucena',
    'jack 8': 'jack8',
    jack8: 'jack8',
    'jack-8': 'jack8',
    jack_8: 'jack8',
    jun: 'jun',
  };

  async formatCharacterName(characterName: string) {
    this.logger.log(`Fetching character code for ${characterName}`);
    const formattedCharacterName = this.characterMap[characterName];
    if (!formattedCharacterName) {
      this.logger.error("Couldn't format character name:", characterName);
      throw new BadRequestException();
    }
    return { characterCode: formattedCharacterName };
  }
}
