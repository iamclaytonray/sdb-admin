import * as React from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
});

// tslint:disable-next-line:no-empty-interface
interface Props {
  value: string;
  onChange: (value: string) => void;
}
type ITab = 'write' | 'preview' | undefined;

export const MarkdownTextField = ({ value, onChange }: Props) => {
  const [selectedTab, setSelectedTab] = React.useState<ITab>('write');
  return (
    <ReactMde
      value={value}
      onChange={onChange}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={(markdown) =>
        Promise.resolve(converter.makeHtml(markdown))
      }
      childProps={{
        writeButton: {
          tabIndex: -1,
        },
      }}
    />
  );
};
