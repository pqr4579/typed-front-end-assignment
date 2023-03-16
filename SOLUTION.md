# Typed Frontend Engineer 기술 과제 SOLUTION

## 사용 기술

### Recoil

전역 상태관리 라이브러리로서 Recoil을 사용하였습니다.

선택한 이유는 다음과 같습니다.

- Redux , Context API와 달리 보일러플레이트가 적어 손쉽게 상태 관리를 위한 환경 Setting을 할 수 있으며,
  상태 변경을 위해 Action , Reducer를 작성해야하는 Redux나 Context API를 위해선 Provider를 작성해야하는 것에 비해 사용 방법이 직관적이고 단순하여 생산성, 가독성이 뛰어나다고 생각했습니다.

- Context API는 상위 컴포넌트에서 하위 컴포넌트로 상태를 전달하는 방식이며, 불필요한 렌더링이 발생합니다. 이런 부분에서 Recoil은 자유로우며, 성능적으로 더 뛰어나다고 생각하여 선택하였습니다.

### Styled-components

CSS-in-JS를 구현하기 위해 선택한 라이브러리입니다.

### 코드 설명

```javascript
export const urlValidator = (urlString: string) => {
  let url;
  try {
    url = new URL(urlString);
  } catch (e) {
    return false;
  }

  return url.protocol === "https:" || url.protocol === "https:";
};
```

### URL Validation을 하기 위한 코드입니다. 단순히 http , https가 includes 되어있는지 확인하기 보단 뷰어를 띄우기 위한 유효한 URL인지 체크하고 해당 만약 그렇지 않다면 false를 return하게 하였습니다.

```javascript
<UrlViwer
  ref={iframeRef}
  key={selectedResource.resource}
  onLoad={(e) => {
    setIsViewerLoading(false);
  }}
  title={selectedResource?.type}
  frameBorder={0}
  sandbox={"allow-same-origin allow-scripts allow-popups allow-forms"}
  src={
    selectedResource.host === YOUTUBE_HOST_NAME
      ? selectedResource.resource
      : TYPED_PROXY_URL + selectedResource.resource
  }
  allowFullScreen
  width="100%"
  height="100%"
/>
```

url 리소스를 위한 Viewer 입니다. 일반적으로 Iframe에 다른 Origin을 가지는
X-Frames-Options 설정이 'Same-Origin'이나 'Deny' 일때 브라우저는 iframe의 작동을 멈춥니다.

이를 해결하기위해 Proxy 서버를 통해 X-Frames-Options를 우회하려고 했습니다.
일단 Proxy 서버를 경유하게 될 경우 성능적으로 좋지 않고, Youtube는 오히려 Proxy를 통할 경우 재생이 안되는 경우가 발생하였습니다.

IFrame이 렌더링 되기 전, 해당 URL이 X-Frames-Option이 'Same-Origin'이나 'Deny' 인지 체크하고 Proxy Server를 통해 경유해야 할 URL인지 먼저 체크는 방식으로 성능 최적화를 이루는 방식을 생각하였으나,

우선 해당 리소스의 X-Frames-Options를 받아오기 위해선 Fetch 통해 Header 정보를 가져와야 했습니다. 하지만 당연히 CORS 정책으로 인해 가져와 지지 않았습니다,

그래서 처음 리소스가 생성되는 Add Resource 때에 ProxyServer를 통해 Header 정보를 가져온 뒤 Proxy 서버를 경유해야 하는 URL이라면 저장해 둔 뒤, 해당 URL 리소스가 선택된다면 isNeededProxy를 체크하고, 뒤에 ProxyServer URL을 붙여주는 방식을 생각하였습니다.

하지만 프록시 서버를 구축 할 수 없었을 뿐더러, 유효 기간이 최대 3일까지 인지라 다른 분이 뵜을때까지 유효한 방식인지 확실하지 않았습니다.

게다가 당연히 프록시 서버에서 보내주는 Header 정보는 X-Frame-Options이 Same-Origin'이나 'Deny'이 아닐 것이었습니다.

결국 해당 유튜브 URL일 경우 ProxyServer를 붙여주지 않고, 나머지는 X-Frame-Options과 관계없이 Proxy-Server URL를 앞에 붙여주는 선택을 하였습니다.

```javascript
export  const  resources  =  atom<{ [key:  string]:  Resource }>({
default: {
	"https://www.robinwieruch.de/react-libraries/": {
		type:"url",
		resource:  "https://www.robinwieruch.de/react-libraries/",
		name:  "https://www.robinwieruch.de/react-libraries/",
		created_at:  new  Date().getTime(),
	},
	"https://typed.blog/how-to-write-a-better-research-paper-faster/": {
		type:"url",
		resource:
		"https://typed.blog/how-to-write-a-better-research-paper-faster/",
		name:  "https://typed.blog/how-to-write-a-better-research-paper-faster/",
		created_at:  new  Date().getTime() +  10,
	},
},
	key:  "resources",
});
```

전역 상태인 Resources 입니다.
key값으로는 현 resource의 url을 넣어주었습니다.
새로운 resource는 url을 기준으로 받으므로, 만일 동일한 URL을 가지는 리소스들이 생겨나는 것을 막기 위함입니다.

최신 추가 순으로 정렬 하라는 요구 사항이 있지만 두개의 default URL의 경우 컴파일 타임에 create_at의 값을 동일하게 가집니다.
getTime()에 10을 더해 동일한 값을 가지게 되는 상황을 피해 정렬이 제대로 되지 않는 현상을 수정하였습니다.

```javascript
const  onImageFileUpload  = (e:  React.ChangeEvent<HTMLInputElement>) => {
	if (e.target.files  &&  e.target.files.length  >  0) {
		const  uploadedImage  =  e.target.files;
		for (let  i  =  0; i  <  uploadedImage.length; i++) {
			const  fileReader  =  new  FileReader();
			const  imageFile  =  uploadedImage.item(i);
			if (imageFile) {
				fileReader.readAsDataURL(imageFile);
				fileReader.onload  = (e) => {
					addResource({
						name:  imageFile.name,
						type:  "image",
						resource:  e.target?.result?.toString() as  string,
					});
				};
			}
		}
	}
};
```

Image Resource를 추가 할때를 처리하는 함수입니다.
FileReader.readAsDataURL로 해당 이미지 파일을 읽어 저장합니다.

readAsDataURL의 경우는 비동기로 실행되기 때문에 사진이 선택한 순서대로 처리되지않고, 먼저 처리된 순서로 addResource 되게 됩니다. 또한 이미지를 base64로 인코딩하여 문자열로 저장하는데 이때문에 메모리가 상당히 잡아먹힙니다. 하지만 사용되지 않는다면 가비지 컬렉터에 의해 자동으로 메모리가 정리된다는 장점이 있습니다.

이를 피하기 위해선 URL의 createObjectURL의 기능을 이용하면 된다고 들었으나 createObjectURL의 경우 일일히 더 이상 사용하지 않을 때 메모리를 직접 해제시켜줘야 한다고 들었습니다.

### Custom Hook

resource에 관련된 변수들이나 함수들을 모아놓아 응집도를 높였습니다.

### 아쉬운 점

시간 상의 이유로 위에 기술한 createObjectURL나 최적화에 대해 신경을 못쓴 점이나 확장성 있게, 범용적으로 작성되지 않은 TextInput Component이 아쉽습니다.
비지니스 캔버스는 Viewer 문제를 어떻게 해결하셨는지에 대한 궁금증이 생겼고 완벽하진 않겠지만 Iframe에 대한 지식을 습득 할 수 있었다는 경험을 할 수 있어서 좋았던 것 같습니다.
읽어 주셔서 감사드립니다.
