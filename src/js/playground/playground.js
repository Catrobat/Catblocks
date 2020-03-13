import Blockly from "scratch-blocks";
import "../catblocks_msgs";
import "./../blocks";
import { checkNextBlock, wrapElement } from '../share/utils';
import XStreamParser from "../parser/parser";
import $ from "jquery";

export class Playground {
  constructor() {
    // for debugging
    this.Blockly = Blockly;
    this.Parser = XStreamParser;

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
        soundsEnabled = (soundsEnabled === 'true');
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
    const select = document.getElementsByName("locale")[0];
    let hasDefault = false;
    Object.keys(this.Blockly.CatblocksMsgs.locales).forEach(locale => {
      const lcoale_opt = document.createElement('option');
      lcoale_opt.value = locale;
      lcoale_opt.innerHTML = this.Blockly.CatblocksMsgs.locales[locale]['DROPDOWN_NAME'];
      select.appendChild(lcoale_opt);
      // TODO: set default to SHARE LANGUAGE
      if (locale === 'en_GB') hasDefault = true;
    });

    match = location.search.match(/locale=([^&]+)/);
    const locale = match ? match[1] : (hasDefault ? 'en_GB' : select.options[0].value);
    this.Blockly.CatblocksMsgs.setLocale(locale);
    document.forms.options.elements.locale.value = locale;

    // Create main workspace.
    this.workspace = this.Blockly.inject('blocklyDiv', {
      comments: true,
      disable: false,
      collapse: false,
      media: '../media/',
      readOnly: false,
      rtl: rtl,
      scrollbars: true,
      toolbox: this.getToolbox(),
      toolboxPosition: side == 'top' || side == 'start' ? 'start' : 'end',
      horizontalLayout: side == 'top' || side == 'bottom',
      sounds: soundsEnabled,
      zoom: {
        controls: true,
        wheel: true,
        startScale: 0.75,
        maxScale: 4,
        minScale: 0.25,
        scaleSpeed: 1.1
      },
      colours: {
        fieldShadow: 'rgba(255, 255, 255, 0.3)',
        dragShadowOpacity: 0.6
      }
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
    $('#showWorkspace').click(e => {
      e.preventDefault();
      this.workspace.setVisible(true);
    });
    $('#hideWorkspace').click(e => {
      e.preventDefault();
      this.workspace.setVisible(false);
    });

    $('#exportToXML').click(() => this.toXml());
    $('#importFromXML').click(() => this.fromXml());
    $('#importFromParser').click(() => this.fromParser());

    const self = this;
    $('#logCheck').click(function() {
      self.logEvents($(this).is(':checked'));
    });
    $('#logFlyoutCheck').click(function() {
      self.logFlyoutEvents($(this).is(':checked'));
    });
    $('#soundsEnabled').click(function() {
      self.setSoundsEnabled($(this).is(':checked'));
    });

    $('#sprinkles').click(() => this.sprinkles(100));
    $('#spaghetti').click(() => this.spaghetti(3));

    $('#glowBlock').click(() => this.glowBlock());
    $('#unglowBlock').click(() => this.unglowBlock());
    $('#zebra').click(() => this.zebra());
    $('#glowStack').click(() => this.glowStack());
    $('#unglowStack').click(() => this.unglowStack());

    $('#undo').click(() => this.workspace.undo());
    $('#redo').click(() => this.workspace.undo(true));

    $('#reportDemo').click(() => this.reportDemo());
  }
  setSoundsEnabled(state) {
    const checkbox = document.getElementById('soundsEnabled');
    checkbox.checked = (state) ? 'checked' : '';
    if (sessionStorage) {
      sessionStorage.setItem('soundsEnabled', state);
    }
  }
  getToolbox() {
    if (!this.toolbox) {
      const xml = document.createElement('xml');
      for (const catName in this.Blockly.Categories) {
        const category = document.createElement('category');
        category.setAttribute('name', `%{BKY_CATEGORY_${catName.toUpperCase()}}`);
        category.setAttribute('id', catName);
        category.setAttribute('colour', this.Blockly.Colours[catName]['primary']);
        category.setAttribute('secondaryColour', this.Blockly.Colours[catName]['secondary']);
        for (const brickName of this.Blockly.Categories[catName]) {
          const brick = document.createElement('block');
          brick.setAttribute('type', brickName);
          category.append(brick);
        }
        xml.append(category);
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
      this.Blockly.Xml.textToDom(textarea.value);
    } catch (e) {
      valid = false;
    }
    document.getElementById('importFromXML').disabled = !valid;
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

    const flyoutWorkspace = (this.workspace.flyout_) ? this.workspace.flyout_.workspace_ :
      this.workspace.toolbox_.flyout_.workspace_;
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
    // this.taChange();
  }
  fromXml() {
    const input = document.getElementById('importExport');
    const xml = this.Blockly.Xml.textToDom(input.value);
    this.Blockly.Xml.domToWorkspace(xml, this.workspace);
    // this.taChange();
  }
  fromParser() {
    const input = document.getElementById('importExport');
    const blocksXml = this.Parser.convertScriptString(input.value);

    if (blocksXml === undefined || blocksXml === "") {
      throw "no response from XStreamParser";
    } else {
      this.Blockly.Xml.domToWorkspace(wrapElement(blocksXml.firstChild, 'xml'), this.workspace);
    }
  }
  zebra() {
    const blocks = this.workspace.topBlocks_;
    checkNextBlock(blocks);
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
      block.moveBy(
        Math.round(Math.random() * 450 + 40),
        Math.round(Math.random() * 600 + 40)
      );
    }
  }
  spaghetti(n) {
    console.log("Starting spaghetti.  This may take some time...");
    let xml = this.spaghettiXml;
    // Nest if/else statements deeply.
    for (let i = 0; i < 2 * n; i++) {
      xml = xml.replace(/(<statement name="SUBSTACK2?"?>)<\//g,
        '$1' + this.spaghettiXml + '</');
    }
    // Stack a bit.
    for (let i = 0; i < n; i++) {
      xml = xml.replace(/(<next>)<\//g,
        '$1' + this.spaghettiXml + '</');
    }

    // Nest boolean comparisons.
    let equalsBlock = this.equalsXml;
    for (let i = 0; i < n; i++) {
      equalsBlock = equalsBlock.replace(
        /(<shadow( type="operator_equals")?>)<\/shadow>/g, this.equalsXml);
    }

    // Put the nested boolean comparisons into if/else statements.
    xml = xml.replace(/(<shadow( type="operator_equals")?>)<\/shadow>/g,
      equalsBlock);

    xml = '<xml xmlns="http://www.w3.org/1999/xhtml">' + xml + '</xml>';
    const dom = this.Blockly.Xml.textToDom(xml);
    console.time('Spaghetti domToWorkspace');
    this.Blockly.Xml.domToWorkspace(dom, this.workspace);
    console.timeEnd('Spaghetti domToWorkspace');
  }
  reportDemo() {
    if (this.Blockly.selected) {
      this.workspace.reportValue(
        this.Blockly.selected.id,
        document.getElementById('reportValue').value
      );
    }
  }
  setLocale(locale) {
    this.workspace.getFlyout().setRecyclingEnabled(false);
    const xml = this.Blockly.Xml.workspaceToDom(this.workspace);
    this.Blockly.CatblocksMsgs.setLocale(locale);
    this.workspace.updateToolbox(this.Blockly.Blocks.defaultToolbox);
    this.Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, this.workspace);
    this.workspace.getFlyout().setRecyclingEnabled(true);
  }


}