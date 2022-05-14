import {
  _decorator,
  Component,
  Node,
  Prefab,
  instantiate,
  Button,
  Label,
} from 'cc';
const { ccclass, property } = _decorator;

const TEXTS = [
  'Bạn không thể nhận phần thưởng do có vật phẩm đã đầy! Phần thưởng sẽ được lưu trữ ở hộp thư, sau 15 ngày nếu không nhận thì phần thưởng phải bị thu hồi',
  'Bộ Cá bơn (danh pháp khoa học: Pleuronectiformes), còn gọi là cá thờn bơn, cá thân bẹt, là một bộ cá trong số các loài cá vây tia, còn được gọi là Heterosomata, đôi khi được phân loại như là phân bộ của Perciformes. Tên gọi này có nghĩa là "bơi bằng lườn" trong tiếng Hy Lạp. Đặc điểm nổi bật của nhiều loài cá trong bộ này là có cả hai mắt nằm ở một mặt bên của đầu (còn mặt bên kia thì không có mắt nào cả); trên thực tế lúc mới sinh cá thân bẹt có 2 mắt nằm 2 bên đầu như các loài cá thông thường nhưng trong quá trình phát triển thì một mắt dần dần chuyển sang mặt bên kia. Một số loài quay mặt "trái" lên trên, một số khác lại quay mặt "phải" lên trên, còn các loài còn lại thì khi thì quay mặt này, khi thì quay mặt kia lên trên.',
  'Trong giải tích toán học, đạo hàm của một hàm số là một đại lượng mô tả sự biến thiên của hàm tại một điểm nào đó. Đạo hàm là một khái niệm cơ bản trong giải tích. Chẳng hạn, trong vật lý, đạo hàm biểu diễn vận tốc tức thời của một điểm chuyển động hoặc cường độ dòng điện tức thời tại một điểm trên dây dẫn.',
  'Gấu trúc đỏ có bộ lông màu nâu đỏ, đuôi dài, xù xì và dáng đi lạch bạch do hai chân trước ngắn hơn; nó gần bằng kích thước của một con mèo nhà, mặc dù có cơ thể dài hơn và có phần nặng hơn. Nó là động vật ăn thực vật và chủ yếu ăn tre, nhưng cũng ăn trứng, chim và côn trùng. Nó là một loài động vật sống đơn độc, chủ yếu hoạt động từ hoàng hôn đến bình minh, và phần lớn ít vận động vào ban ngày. Nó còn được gọi là gấu trúc nhỏ và gấu mèo đỏ.',
  'Tích vô hướng (tên tiếng Anh: dot product hoặc scalar product) là một phép toán đại số lấy hai chuỗi số có độ dài bằng nhau (thường là các vectơ tọa độ) và cho kết quả là một số. Trong hình học Euclid, tích vô hướng với tọa độ Descartes của hai vectơ thường được sử dụng. Tích vô hướng cũng thường được gọi là tích trong Euclid dù nó không phải là loại tích trong duy nhất có thể được định nghĩa trong không gian Euclid (xem thêm tại Không gian tích trong).',
  'Mùa sưu đến, chị Dậu phải chạy vạy khắp nơi vay tiền để nộp cho chồng, nhưng không kiếm đâu ra. Anh Dậu dù bị ốm nhưng vẫn bị bọn cai lệ cùm kẹp lôi ra giam ở đình làng. Cuối cùng, bần cùng quá, chị buộc lòng phải dứt ruột bán đi cái Tí, đứa con gái đầu lòng 7 tuổi ngoan ngoãn, hiếu thảo và ổ chó mới đẻ chưa kịp mở mắt cho vợ chồng lão Nghị Quế bên thôn Đoài để lấy hai đồng nộp sưu. Nhưng vừa đủ tiền nộp xong suất sưu cho chồng, bọn cai trong làng lại ép chị nộp cả tiền sưu cho em trai anh Dậu với lý do chết ở năm ta nhưng lúc đó lịch năm tây đã sang năm mới. Vậy là anh Dậu vẫn bị bắt không được về nhà.',
  'Cá voi sát thủ linh hoạt, nhanh nhẹn và là một loài động vật ăn thịt thông minh. Một số ăn cá, một số săn các loài thú biển như sư tử biển, hải cẩu, cá voi và cả loài cá mập trắng lớn cũng là nạn nhân của nó. Nó là loài săn mồi đỉnh cao ở đại dương và không có kẻ thù tự nhiên xứng tầm nào ngoài con người. Có thể có đến 5 loại cá heo voi khác nhau, một số có thể tách thành các giống, phụ thậm chí là tách thành loài riêng biệt. Cá voi sát thủ là loài có tổ chức xã hội cao, một số theo chế độ mẫu hệ, bền vững hơn bất kì loài thú nào khác, tất nhiên là trừ loài người. Cách cư xử xã hội phức tạp, kỹ thuật săn mồi, âm thanh giao tiếp của cá heo voi được coi là một nét văn hóa của chúng.',
  'Khi bắt đầu sự nghiệp của mình, Einstein đã nhận ra cơ học Newton không còn có thể thống nhất các định luật của cơ học cổ điển với các định luật của trường điện từ. Từ đó ông phát triển thuyết tương đối đặc biệt, với các bài báo đăng trong năm 1905. Tuy nhiên, ông nhận thấy nguyên lý tương đối có thể mở rộng cho cả trường hấp dẫn, và điều này dẫn đến sự ra đời của lý thuyết về hấp dẫn trong năm 1916, năm ông xuất bản một bài báo về thuyết tương đối tổng quát. Ông tiếp tục nghiên cứu các bài toán của cơ học thống kê và lý thuyết lượng tử, trong đó đưa ra những giải thích về lý thuyết hạt và sự chuyển động của các phân tử.',
  'Tự kỷ ám thị (tự mình che mắt) hay tự thôi miên (Autosuggestion) tự tâm niệm là thuật ngữ đề cập đến tất cả những hình thức tự kích thích và khuyến khích bản thân qua năm giác quan của con người, là quá trình tự tâm niệm, tự khích lệ. Tự kỷ ám thị đóng vai trò cầu nối giữ một bên là phần ý thức tạo ra tư duy và một bên là phần tiềm thức tạo ra hành động. Thông qua những suy nghĩ chi phối tâm trí bấy lâu nay vẫn tồn tại trong ý thức (không quan trọng đó là những ý nghĩ tích cực hay tiêu cực), những nguyên tắc của tự kỷ ám thị sẽ chạm đến tiềm thức của con người và tác động đến tiềm thức bằng những suy nghĩ đó.[1] Trong tiếng Việt, tự kỷ ám thị là một từ ghép giữa tự kỷ và ám thị hay còn gọi là tự thôi miên.',
];

@ccclass('VietnameseText')
export class VietnameseText extends Component {
  @property(Node) btnContainer: Node = null;
  @property(Prefab) btnPrefab: Prefab = null;
  @property(Label) previewLabel: Label = null;

  onLoad() {
    TEXTS.forEach((_, idx) => {
      const node = instantiate(this.btnPrefab);
      node.getComponentInChildren(Label).string = `Text ${idx + 1}`;
      node.on(Button.EventType.CLICK, () => {
        this.previewLabel.string = TEXTS[idx];
      });
      this.btnContainer.addChild(node);
    });
  }

  start() {}

  update(deltaTime: number) {}
}
