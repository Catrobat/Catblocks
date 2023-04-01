import Blockly from 'blockly';
import { jsonDomToWorkspace, zebraChangeColor, RenderSource_Share } from '../../../library/js/integration/utils';
import { Parser } from '../../../common/js/parser/parser';
import { CatblocksMsgs } from '../../../library/js/catblocks_msgs';
import { initBricks } from '../../../library/js/blocks/bricks';

export class Playground {
  constructor() {
    // for debugging
    this.Blockly = Blockly;
    this.Parser = Parser;

    this.toolbox = undefined;
    this.workspace = undefined;
  }
  init() {
    this.bindListeners();

    this.equalsXml = [
      '  <shadow type="operator_equals">',
      '    <value name="OPERAND1">',
      '     <shadow type="text">',
      '      <field name="TEXT">foo</field>',
      '     </shadow>',
      '    </value>',
      '    <value name="OPERAND2">',
      '      <shadow type="operator_equals"></shadow>',
      '    </value>',
      '  </shadow>'
    ].join('\n');

    this.spaghettiXml = [
      '  <block type="control_if_else">',
      '    <value name="CONDITION">',
      '      <shadow type="operator_equals"></shadow>',
      '    </value>',
      '    <statement name="SUBSTACK"></statement>',
      '    <statement name="SUBSTACK2"></statement>',
      '    <next></next>',
      '  </block>'
    ].join('\n');

    let soundsEnabled = null;
    if (sessionStorage) {
      // Restore sounds state.
      soundsEnabled = sessionStorage.getItem('soundsEnabled');
      if (soundsEnabled === null) {
        soundsEnabled = true;
      } else {
        soundsEnabled = soundsEnabled === 'true';
      }
    } else {
      soundsEnabled = true;
    }
    this.setSoundsEnabled(soundsEnabled);

    // Setup blocks
    // Parse the URL arguments.
    let match = location.search.match(/dir=([^&]+)/);
    const rtl = match && match[1] == 'rtl';
    document.forms.options.elements.dir.selectedIndex = Number(rtl);
    match = location.search.match(/side=([^&]+)/);
    const side = match ? match[1] : 'start';
    document.forms.options.elements.side.value = side;

    // Setup locale
    const select = document.getElementsByName('locale')[0];
    Object.keys(CatblocksMsgs.getLocales()).forEach(locale => {
      const lcoale_opt = document.createElement('option');
      lcoale_opt.value = locale;
      lcoale_opt.innerHTML = CatblocksMsgs.getLocales()[locale]['DROPDOWN_NAME'];
      select.appendChild(lcoale_opt);
    });
    document.forms.options.elements.locale.value = CatblocksMsgs.getCurrentLocale();

    initBricks(false);

    // Create main workspace.
    this.workspace = this.Blockly.inject('blocklyDiv', {
      zoom: { startScale: 0.75 },
      toolbox: this.getToolbox(),
      renderer: 'zelos'
    });

    if (sessionStorage) {
      // Restore previously displayed text.
      const text = sessionStorage.getItem('textarea');
      if (text) {
        document.getElementById('importExport').value = text;
      }
      // this.taChange();
    }

    if (sessionStorage) {
      // Restore event logging state.
      let state = sessionStorage.getItem('logEvents');
      this.logEvents(Boolean(state));

      // Restore flyout event logging state.
      state = sessionStorage.getItem('logFlyoutEvents');
      this.logFlyoutEvents(Boolean(state));
    }
  }
  bindListeners() {
    document.getElementById('showWorkspace').addEventListener('click', e => {
      e.preventDefault();
      this.workspace.setVisible(true);
    });
    document.getElementById('hideWorkspace').addEventListener('click', e => {
      e.preventDefault();
      this.workspace.setVisible(false);
    });
    document
      .getElementById('locale')
      .addEventListener('click', () => this.setLocale(document.forms.options.elements.locale.value));

    document.getElementById('exportToXML').addEventListener('click', () => this.toXml());
    document.getElementById('importFromJSON').addEventListener('click', () => this.fromJSON());
    document.getElementById('importFromParser').addEventListener('click', () => this.fromParser());

    const self = this;
    document.getElementById('logCheck').addEventListener('click', () => {
      self.logEvents(this.checked);
    });
    document.getElementById('logFlyoutCheck').addEventListener('click', () => {
      self.logFlyoutEvents(this.checked);
    });
    document.getElementById('soundsEnabled').addEventListener('click', () => {
      self.setSoundsEnabled(this.checked);
    });

    document.getElementById('sprinkles').addEventListener('click', () => this.sprinkles(100));
    document.getElementById('spaghetti').addEventListener('click', () => this.spaghetti(3));

    document.getElementById('glowBlock').addEventListener('click', () => this.glowBlock());
    document.getElementById('unglowBlock').addEventListener('click', () => this.unglowBlock());
    document.getElementById('zebra').addEventListener('click', () => this.zebra());
    document.getElementById('glowStack').addEventListener('click', () => this.glowStack());
    document.getElementById('unglowStack').addEventListener('click', () => this.unglowStack());

    document.getElementById('undo').addEventListener('click', () => this.workspace.undo());
    document.getElementById('redo').addEventListener('click', () => this.workspace.undo(true));

    document.getElementById('reportDemo').addEventListener('click', () => this.reportDemo());
  }
  setSoundsEnabled(state) {
    const checkbox = document.getElementById('soundsEnabled');
    checkbox.checked = state ? 'checked' : '';
    if (sessionStorage) {
      sessionStorage.setItem('soundsEnabled', state);
    }
  }
  getToolbox(simple = false) {
    if (!this.toolbox) {
      const xml = document.createElement('xml');
      for (const catName in this.Blockly.Categories) {
        let parentNode = xml;
        if (!simple) {
          const category = document.createElement('category');
          category.setAttribute('name', catName.toUpperCase());
          category.setAttribute('id', catName);
          category.setAttribute('colour', this.Blockly.Colours[catName]['colourPrimary']);
          category.setAttribute('secondaryColour', this.Blockly.Colours[catName]['colourSecondary']);
          parentNode = category;
        }
        for (const brickName of this.Blockly.Categories[catName]) {
          const brick = document.createElement('block');
          brick.setAttribute('type', brickName);
          parentNode.append(brick);
        }
        if (!simple) {
          xml.append(parentNode);
        }
      }
      this.toolbox = xml;
    }

    return this.toolbox;
  }
  // Disable the "Import from XML" button if the XML is invalid.
  // Preserve text between page reloads.
  taChange() {
    const textarea = document.getElementById('importExport');
    if (sessionStorage) {
      sessionStorage.setItem('textarea', textarea.value);
    }
    let valid = true;
    try {
      JSON.parse(textarea.value);
    } catch (e) {
      valid = false;
    }
    document.getElementById('importFromJSON').disabled = !valid;
  }
  logEvents(state) {
    const checkbox = document.getElementById('logCheck');
    checkbox.checked = state;
    if (sessionStorage) {
      sessionStorage.setItem('logEvents', state ? 'checked' : '');
    }
    if (state) {
      this.workspace.addChangeListener(this.logger);
    } else {
      this.workspace.removeChangeListener(this.logger);
    }
  }
  logger(e) {
    console.log(e);
  }
  logFlyoutEvents(state) {
    const checkbox = document.getElementById('logFlyoutCheck');
    checkbox.checked = state;

    if (sessionStorage) {
      sessionStorage.setItem('logFlyoutEvents', state ? 'checked' : '');
    }

    const flyoutWorkspace = this.workspace.getFlyout(true)
      ? this.workspace.getFlyout(true).getWorkspace()
      : this.workspace.getToolbox().getFlyout(true).getWorkspace();
    if (state) {
      flyoutWorkspace.addChangeListener(this.logger);
    } else {
      flyoutWorkspace.removeChangeListener(this.logger);
    }
  }
  toXml() {
    const output = document.getElementById('importExport');
    const xml = this.Blockly.Xml.workspaceToDom(this.workspace);
    output.value = this.Blockly.Xml.domToPrettyText(xml);
    output.focus();
    output.select();
  }
  fromJSON() {
    try {
      const input = document.getElementById('importExport');
      const json = JSON.parse(input.value);
      if (json.scriptList !== undefined && json.scriptList.length > 0) {
        for (let i = 0; i < json.scriptList.length; i++) {
          jsonDomToWorkspace(json.scriptList[i], this.workspace, RenderSource_Share);
        }
      } else {
        jsonDomToWorkspace(json, this.workspace, RenderSource_Share);
      }
    } catch (e) {
      console.error(e.message);
      console.error("Can't render current JSON object - object has to start with scriptList.");
    }
  }
  fromParser() {
    const beforeScript = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><program><header>
      <catrobatLanguageVersion>0.99997</catrobatLanguageVersion><programName>Catblocks Playground</programName></header><scenes><scene><name>testscene</name>
      <objectList><object type="Sprite" name="testsprite"><lookList><look fileName="test.png" name="testlook"/>
      </lookList><soundList/><scriptList>`;
    const afterScript = `</scriptList></object></objectList></scene></scenes></program>`;
    try {
      const input = document.getElementById('importExport');
      const xmlString = beforeScript + input.value + afterScript;
      const blocksJSON = this.Parser.convertProgramToJSONDebug(xmlString);
      if (blocksJSON !== undefined) {
        const scenes = blocksJSON.scenes;
        if (scenes !== undefined && scenes.length > 0) {
          for (let i = 0; i < scenes.length; i++) {
            const objectList = scenes[i].objectList;
            if (objectList !== undefined && objectList.length > 0) {
              for (let j = 0; j < objectList.length; j++) {
                const scriptList = objectList[j].scriptList;
                if (scriptList !== undefined && scriptList.length > 0) {
                  for (let k = 0; k < scriptList.length; k++) {
                    jsonDomToWorkspace(scriptList[k], this.workspace, RenderSource_Share);
                  }
                }
              }
            }
          }
        }
      }
    } catch (e) {
      console.error('import script via parser failed. Only use xml object starting with script tag.');
      console.error(e);
    }
  }
  zebra() {
    const blocks = this.workspace.getTopBlocks();
    console.log(blocks);
    zebraChangeColor(blocks);
  }

  glowBlock() {
    if (this.Blockly.selected) {
      this.workspace.glowBlock(this.Blockly.selected.id, true);
    }
  }
  unglowBlock() {
    if (this.Blockly.selected) {
      this.workspace.glowBlock(this.Blockly.selected.id, false);
    }
  }
  glowStack() {
    if (this.Blockly.selected) {
      this.workspace.glowStack(this.Blockly.selected.id, true);
    }
  }
  unglowStack() {
    if (this.Blockly.selected) {
      this.workspace.glowStack(this.Blockly.selected.id, false);
    }
  }
  sprinkles(n) {
    const toolbox = this.workspace.options.languageTree;
    if (!toolbox) {
      console.error('Toolbox not found; add a toolbox element to the DOM.');
      return;
    }
    const blocks = toolbox.getElementsByTagName('block');
    for (let i = 0; i < n; i++) {
      const blockXML = blocks[Math.floor(Math.random() * blocks.length)];
      const block = this.Blockly.Xml.domToBlock(blockXML, this.workspace);
      block.initSvg();
      block.moveBy(Math.round(Math.random() * 450 + 40), Math.round(Math.random() * 600 + 40));
    }
  }
  spaghetti(n) {
    console.log('Starting spaghetti.  This may take some time...');
    let xml = this.spaghettiXml;
    // Nest if/else statements deeply.
    for (let i = 0; i < 2 * n; i++) {
      xml = xml.replace(/(<statement name="SUBSTACK2?"?>)<\//g, '$1' + this.spaghettiXml + '</');
    }
    // Stack a bit.
    for (let i = 0; i < n; i++) {
      xml = xml.replace(/(<next>)<\//g, '$1' + this.spaghettiXml + '</');
    }

    // Nest boolean comparisons.
    let equalsBlock = this.equalsXml;
    for (let i = 0; i < n; i++) {
      equalsBlock = equalsBlock.replace(/(<shadow( type="operator_equals")?>)<\/shadow>/g, this.equalsXml);
    }

    // Put the nested boolean comparisons into if/else statements.
    xml = xml.replace(/(<shadow( type="operator_equals")?>)<\/shadow>/g, equalsBlock);

    xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' + xml + '</xml>';
    const dom = this.Blockly.Xml.textToDom(xml);
    console.time('Spaghetti domToWorkspace');
    this.Blockly.Xml.domToWorkspace(dom, this.workspace);
    console.timeEnd('Spaghetti domToWorkspace');
  }
  reportDemo() {
    if (this.Blockly.selected) {
      this.workspace.reportValue(this.Blockly.selected.id, document.getElementById('reportValue').value);
    }
  }
  setLocale(locale) {
    return CatblocksMsgs.setLocale(locale)
      .then(() => {
        this.workspace.updateToolbox(this.getToolbox());
        const xml = this.Blockly.Xml.workspaceToDom(this.workspace);
        this.Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
      })
      .catch(error => console.error(error));
  }
}
